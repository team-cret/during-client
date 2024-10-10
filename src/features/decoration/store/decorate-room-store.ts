import { getRoomItemBagAPI, getRoomItemShopAPI, purchaseRoomItemAPI } from '@/src/entities';
import {
  roomDecorationCategories,
  roomDecorationCategoriesType,
  RoomItem,
  roomItems,
} from '@/src/shared';
import * as THREE from 'three';
import { create } from 'zustand';

type State = {
  mode: number; // 0 : shop, 1 : bag
  category: roomDecorationCategoriesType;
  isPurchaseMode: boolean;
  purchaseItems: Array<{
    itemId: string;
    // isSelected: boolean;
  }>;
  bagItems: Array<string>;
  shopItems: Array<string>;
  roomInfo: {
    background: {
      id: number | null;
      itemId: string;
    };
    objects: Array<{
      id: number | null;
      itemId: string;
      position: THREE.Vector3;
      rotation: number;
    }>;
    selectedObjectIdx: number | null;
    selectedPoint: THREE.Vector3;
    isObjectExists: Array<Array<boolean>>;
  };
};

const defaultState: State = {
  mode: 1,
  category: roomDecorationCategories[0],
  isPurchaseMode: false,
  purchaseItems: [],
  bagItems: [],
  shopItems: [],
  roomInfo: {
    background: {
      id: null,
      itemId: '1',
    },
    objects: [],
    selectedObjectIdx: null,
    selectedPoint: new THREE.Vector3(0, 0, 0),
    isObjectExists: Array.from({ length: 12 }, () => Array.from({ length: 12 }, () => false)),
  },
};

type Action = {
  init: ({
    background,
    objects,
  }: {
    background: {
      id: number | null;
      itemId: string;
    };
    objects: Array<{
      id: number;
      itemId: string;
      position: THREE.Vector3;
      rotation: number;
    }>;
  }) => Promise<boolean>;
  setMode: (mode: number) => void;
  setCategory: (category: roomDecorationCategoriesType) => void;
  setIsPurchaseMode: (isPurchaseMode: boolean) => void;

  selectBagItem: (itemId: string) => void;
  selectShopItem: (itemId: string) => void;
  confirmPurchase: ({ userRole }: { userRole: 'ROLE_SINGLE' | 'ROLE_COUPLE' | null }) => Promise<{
    background: {
      id: number | null;
      itemId: string;
    } | null;
    objects: Array<{
      id: number | null;
      itemId: string;
      position: THREE.Vector3;
      rotation: number;
    }> | null;
  }>;

  selectObject: (idx: number, point: THREE.Vector3) => void;
  deselectObject: () => void;
  moveObject: (position: THREE.Vector3) => void;
  putItemIntoBag: () => void;
  rotateSelectedObject: () => void;
};

const useDecorateRoomStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  init: async ({ background, objects }) => {
    const isObjectExists = Array.from({ length: 12 }, () =>
      Array.from({ length: 12 }, () => false)
    );
    objects.forEach((object) => {
      for (
        let i = 0;
        i <
        (object.rotation % 2 === 0
          ? roomItems[object.itemId].size.width
          : roomItems[object.itemId].size.depth);
        i++
      )
        for (
          let j = 0;
          j <
          (object.rotation % 2 === 1
            ? roomItems[object.itemId].size.width
            : roomItems[object.itemId].size.depth);
          j++
        )
          isObjectExists[object.position.z + i][object.position.x + j] = true;
    });

    const bagItems = await getRoomItemBagAPI();
    const shopItems = await getRoomItemShopAPI();

    set({
      ...defaultState,
      bagItems: bagItems,
      shopItems: shopItems,
      roomInfo: {
        background,
        objects,
        selectedObjectIdx: defaultState.roomInfo.selectedObjectIdx,
        selectedPoint: defaultState.roomInfo.selectedPoint,
        isObjectExists,
      },
    });
    return true;
  },
  setMode: (mode) => set({ mode }),
  setCategory: (category) => set({ category }),
  setIsPurchaseMode: (isPurchaseMode) => set({ isPurchaseMode }),
  selectBagItem: (itemId) => {
    if (roomItems[itemId].category === '배경')
      set((state) => ({
        ...state,
        roomInfo: {
          ...state.roomInfo,
          background: {
            id: null,
            itemId: itemId,
          },
          selectedObjectIdx: defaultState.roomInfo.selectedObjectIdx,
        },
        purchaseItems: state.purchaseItems.filter(
          (item) => item.itemId !== state.roomInfo.background.itemId
        ),
      }));
    else
      set((state) => ({
        ...state,
        roomInfo: {
          ...state.roomInfo,
          objects: [
            ...state.roomInfo.objects,
            {
              id: null,
              itemId,
              position: new THREE.Vector3(6, 0, 6),
              rotation: 0,
            },
          ],
          selectedObjectIdx: get().roomInfo.objects.length,
        },
      }));
  },
  selectShopItem: (itemId) => {
    if (roomItems[itemId].category === '배경')
      set((state) => ({
        ...state,
        roomInfo: {
          ...state.roomInfo,
          background: {
            id: null,
            itemId,
          },
          selectedObjectIdx: defaultState.roomInfo.selectedObjectIdx,
        },
        purchaseItems: [
          ...state.purchaseItems.filter((item) => item.itemId !== state.roomInfo.background.itemId),
          { itemId },
        ],
      }));
    else
      set((state) => ({
        ...state,
        roomInfo: {
          ...state.roomInfo,
          objects: [
            ...state.roomInfo.objects,
            {
              id: null,
              itemId,
              position: new THREE.Vector3(6, 0, 6),
              rotation: 0,
            },
          ],
          selectedObjectIdx: get().roomInfo.objects.length,
        },
        purchaseItems: [...state.purchaseItems, { itemId }],
      }));
  },
  confirmPurchase: async ({ userRole }) => {
    const purchaseResult =
      userRole == 'ROLE_SINGLE' ? true : await purchaseRoomItemAPI(get().purchaseItems);
    if (!purchaseResult)
      return {
        background: null,
        objects: null,
      };

    return {
      background: get().roomInfo.background,
      objects: get().roomInfo.objects,
    };
  },

  selectObject: (idx, point) => {
    const selectedItem = get().roomInfo.objects[idx];
    if (selectedItem === undefined) return;
    set((state) => ({
      ...state,
      roomInfo: {
        ...state.roomInfo,
        selectedObjectIdx: idx,
        selectedPoint: new THREE.Vector3(
          Math.round(point.x) - selectedItem.position.x,
          Math.round(point.y) - selectedItem.position.y,
          Math.round(point.z) - selectedItem.position.z
        ),
      },
    }));
  },
  deselectObject: () => {
    set((state) => ({
      ...state,
      roomInfo: {
        ...state.roomInfo,
        selectedObjectIdx: defaultState.roomInfo.selectedObjectIdx,
      },
    }));
  },
  moveObject: (point) => {
    const position = new THREE.Vector3(
      Math.round(point.x) - get().roomInfo.selectedPoint.x,
      0,
      Math.round(point.z) - get().roomInfo.selectedPoint.z
    );
    if (position.x < 0 || position.x > 12 || position.z < 0 || position.z > 12) return;
    const selectedObject = get().roomInfo.objects[get().roomInfo.selectedObjectIdx!];
    if (!selectedObject) return;
    const selectedItem = roomItems[selectedObject.itemId];
    if (
      position.z +
        (selectedObject.rotation % 2 === 0 ? selectedItem.size.width : selectedItem.size.depth) >
        12 ||
      position.x +
        (selectedObject.rotation % 2 === 1 ? selectedItem.size.width : selectedItem.size.depth) >
        12
    )
      return;

    const isObjectExists = get().roomInfo.isObjectExists;
    for (
      let i = 0;
      i < (selectedObject.rotation % 2 === 0 ? selectedItem.size.width : selectedItem.size.depth);
      i++
    ) {
      for (
        let j = 0;
        j < (selectedObject.rotation % 2 === 1 ? selectedItem.size.width : selectedItem.size.depth);
        j++
      ) {
        isObjectExists[selectedObject.position.z + i][selectedObject.position.x + j] = false;
      }
    }

    for (
      let i = 0;
      i < (selectedObject.rotation % 2 === 0 ? selectedItem.size.width : selectedItem.size.depth);
      i++
    ) {
      for (
        let j = 0;
        j < (selectedObject.rotation % 2 === 1 ? selectedItem.size.width : selectedItem.size.depth);
        j++
      ) {
        if (isObjectExists[position.z + i][position.x + j]) return;
      }
    }

    for (
      let i = 0;
      i < (selectedObject.rotation % 2 === 0 ? selectedItem.size.width : selectedItem.size.depth);
      i++
    ) {
      for (
        let j = 0;
        j < (selectedObject.rotation % 2 === 1 ? selectedItem.size.width : selectedItem.size.depth);
        j++
      ) {
        isObjectExists[position.z + i][position.x + j] = true;
      }
    }

    set((state) => ({
      ...state,
      roomInfo: {
        ...state.roomInfo,
        objects: state.roomInfo.objects.map((object, idx) =>
          idx === state.roomInfo.selectedObjectIdx ? { ...object, position: position } : object
        ),
        isObjectExists,
      },
    }));
  },
  putItemIntoBag: () => {
    if (get().roomInfo.selectedObjectIdx === null) return;

    const selectedItemId = get().roomInfo.objects[get().roomInfo.selectedObjectIdx!].itemId;
    const selectedPurchaseItemIdx = get().purchaseItems.findIndex(
      (item) => item.itemId === selectedItemId
    );
    const newPurchaseItems =
      selectedPurchaseItemIdx === -1
        ? get().purchaseItems
        : get().purchaseItems.filter((item, idx) => idx !== selectedPurchaseItemIdx);

    set((state) => ({
      ...state,
      roomInfo: {
        ...state.roomInfo,
        selectedObjectIdx: defaultState.roomInfo.selectedObjectIdx,
        objects: state.roomInfo.objects.filter(
          (object, idx) => idx !== state.roomInfo.selectedObjectIdx
        ),
      },
      purchaseItems: newPurchaseItems,
    }));
  },
  rotateSelectedObject: () => {
    if (get().roomInfo.selectedObjectIdx === null) return;

    const selectedObject = get().roomInfo.objects[get().roomInfo.selectedObjectIdx!];
    for (let i = 1; i <= 4; i++) {
      if (
        selectedObject.position.z +
          ((selectedObject.rotation + i) % 2 === 0
            ? roomItems[selectedObject.itemId].size.width
            : roomItems[selectedObject.itemId].size.depth) >
          12 ||
        selectedObject.position.x +
          ((selectedObject.rotation + i) % 2 === 1
            ? roomItems[selectedObject.itemId].size.width
            : roomItems[selectedObject.itemId].size.depth) >
          12
      )
        continue;

      set((state) => ({
        ...state,
        roomInfo: {
          ...state.roomInfo,
          objects: state.roomInfo.objects.map((object, idx) =>
            idx === state.roomInfo.selectedObjectIdx
              ? { ...object, rotation: (object.rotation + i) % 4 }
              : object
          ),
        },
      }));
      break;
    }
  },
}));

export { useDecorateRoomStore };
