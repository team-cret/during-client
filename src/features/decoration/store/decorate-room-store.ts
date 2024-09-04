import {
  roomDecorationCategories,
  roomDecorationCategoriesType,
  RoomItem,
  roomItems,
} from '@/src/shared';
import THREE from 'three';
import { create } from 'zustand';

type State = {
  mode: number; // 0 : shop, 1 : bag
  category: roomDecorationCategoriesType;
  isPurchaseMode: boolean;
  purchaseItems: Array<{
    item: RoomItem;
    isSelected: boolean;
  }>;
  bagItems: Array<RoomItem>;
  shopItems: Array<RoomItem>;
  room: {
    background: RoomItem;
    objects: Array<{
      item: RoomItem;
      position: THREE.Vector3;
      rotation: number;
    }>;
    selectedObjectId: number;
    selectedPoint: THREE.Vector3;
    isObjectExists: Array<Array<boolean>>;
  };
};

const defaultState: State = {
  mode: 1,
  category: roomDecorationCategories[0],
  isPurchaseMode: false,
  purchaseItems: [],
  bagItems: [roomItems[0], roomItems[2], roomItems[4], roomItems[6]],
  shopItems: [roomItems[1], roomItems[3], roomItems[5]],
  room: {
    background: roomItems[0],
    objects: [],
    selectedObjectId: -1,
    selectedPoint: new THREE.Vector3(0, 0, 0),
    isObjectExists: Array.from({ length: 12 }, () => Array.from({ length: 12 }, () => false)),
  },
};

type Action = {
  init: ({
    background,
    objects,
  }: {
    background: RoomItem;
    objects: Array<{
      item: RoomItem;
      position: THREE.Vector3;
      rotation: number;
    }>;
  }) => void;
  setMode: (mode: number) => void;
  setCategory: (category: roomDecorationCategoriesType) => void;
  setIsPurchaseMode: (isPurchaseMode: boolean) => void;

  selectBagItem: (id: number) => void;
  selectShopItem: (id: number) => void;
  togglePurchaseItem: (id: number) => void;
  confirmPurchase: () => {
    background: RoomItem | null;
    objects: Array<{
      item: RoomItem;
      position: THREE.Vector3;
      rotation: number;
    }>;
  };

  selectObject: (id: number, point: THREE.Vector3) => void;
  deselectObject: () => void;
  moveObject: (position: THREE.Vector3) => void;
  putItemIntoBag: () => void;
  rotateSelectedObject: () => void;
};

const useDecorateRoomStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  init: ({ background, objects }) => {
    const isObjectExists = Array.from({ length: 12 }, () =>
      Array.from({ length: 12 }, () => false)
    );
    objects.forEach((e) => {
      for (let i = 0; i < (e.rotation % 2 === 0 ? e.item.size.depth : e.item.size.width); i++)
        for (let j = 0; j < (e.rotation % 2 === 1 ? e.item.size.depth : e.item.size.width); j++)
          isObjectExists[e.position.x + i][e.position.z + j] = true;
    });

    set({
      mode: defaultState.mode,
      category: defaultState.category,
      isPurchaseMode: defaultState.isPurchaseMode,
      purchaseItems: defaultState.purchaseItems,
      bagItems: defaultState.bagItems,
      shopItems: defaultState.shopItems,
      room: {
        background,
        objects,
        selectedObjectId: defaultState.room.selectedObjectId,
        selectedPoint: defaultState.room.selectedPoint,
        isObjectExists,
      },
    });
  },
  setMode: (mode) => set({ mode }),
  setCategory: (category) => set({ category }),
  setIsPurchaseMode: (isPurchaseMode) => set({ isPurchaseMode }),
  selectBagItem: (id) => {
    const selectedItem = get().bagItems.find((item) => item.id === id);
    if (!selectedItem) return;
    if (selectedItem.category === '배경')
      set((state) => ({
        ...state,
        room: {
          ...state.room,
          background: selectedItem,
          selectedObjectId: defaultState.room.selectedObjectId,
        },
      }));
    else
      set((state) => ({
        ...state,
        room: {
          ...state.room,
          objects: [
            ...state.room.objects,
            {
              item: selectedItem,
              position: new THREE.Vector3(6, 0, 6),
              rotation: 0,
            },
          ],
          selectedObjectId: selectedItem.id,
        },
      }));
  },
  selectShopItem: (id) => {
    const selectedItem = get().shopItems.find((item) => item.id === id);
    if (!selectedItem) return;
    if (selectedItem.category === '배경')
      set((state) => ({
        ...state,
        purchaseItems: [...state.purchaseItems, { item: selectedItem, isSelected: true }],
        room: {
          ...state.room,
          background: selectedItem,
          selectedObjectId: defaultState.room.selectedObjectId,
        },
      }));
    else
      set((state) => ({
        ...state,
        purchaseItems: [...state.purchaseItems, { item: selectedItem, isSelected: true }],
        room: {
          ...state.room,
          objects: [
            ...state.room.objects,
            {
              item: selectedItem,
              position: new THREE.Vector3(6, 0, 6),
              rotation: 0,
            },
          ],
          selectedObjectId: selectedItem.id,
        },
      }));
  },
  togglePurchaseItem: (id) => {
    set((state) => ({
      ...state,
      purchaseItems: state.purchaseItems.map((item) =>
        item.item.id === id ? { ...item, isSelected: !item.isSelected } : item
      ),
    }));
  },
  confirmPurchase: () => {
    const backgroundItem = get().purchaseItems.find(
      (item) => item.item.id === get().room.background.id
    );

    return {
      background: !backgroundItem || backgroundItem.isSelected ? get().room.background : null,
      objects: get().room.objects.filter((e) => {
        const item = get().purchaseItems.find((p) => p.item.id === e.item.id);
        if (!item || item.isSelected) return e;
      }),
    };
  },

  selectObject: (id, point) => {
    const selectedItem = get().room.objects.find((e) => e.item.id === id);
    if (selectedItem === undefined) return;
    set((state) => ({
      ...state,
      room: {
        ...state.room,
        selectedObjectId: id,
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
      room: {
        ...state.room,
        selectedObjectId: defaultState.room.selectedObjectId,
      },
    }));
  },
  moveObject: (point) => {
    const position = new THREE.Vector3(
      Math.round(point.x) - get().room.selectedPoint.x,
      0,
      Math.round(point.z) - get().room.selectedPoint.z
    );
    const selectedItem = get().room.objects.find((e) => e.item.id === get().room.selectedObjectId);
    if (selectedItem === undefined) return;
    if (position.x < 0 || position.x > 12 || position.z < 0 || position.z > 12) return;
    if (
      position.x +
        (selectedItem.rotation % 2 === 0
          ? selectedItem.item.size.depth
          : selectedItem.item.size.width) >
        12 ||
      position.z +
        (selectedItem.rotation % 2 === 1
          ? selectedItem.item.size.depth
          : selectedItem.item.size.width) >
        12
    )
      return;

    const isObjectExists = get().room.isObjectExists;
    for (
      let i = 0;
      i <
      (selectedItem.rotation % 2 === 0
        ? selectedItem.item.size.depth
        : selectedItem.item.size.width);
      i++
    )
      for (
        let j = 0;
        j <
        (selectedItem.rotation % 2 === 1
          ? selectedItem.item.size.depth
          : selectedItem.item.size.width);
        j++
      )
        isObjectExists[selectedItem.position.x + i][selectedItem.position.z + j] = false;

    for (
      let i = 0;
      i <
      (selectedItem.rotation % 2 === 0
        ? selectedItem.item.size.depth
        : selectedItem.item.size.width);
      i++
    )
      for (
        let j = 0;
        j <
        (selectedItem.rotation % 2 === 1
          ? selectedItem.item.size.depth
          : selectedItem.item.size.width);
        j++
      )
        if (isObjectExists[position.x + i][position.z + j]) return;

    for (
      let i = 0;
      i <
      (selectedItem.rotation % 2 === 0
        ? selectedItem.item.size.depth
        : selectedItem.item.size.width);
      i++
    )
      for (
        let j = 0;
        j <
        (selectedItem.rotation % 2 === 1
          ? selectedItem.item.size.depth
          : selectedItem.item.size.width);
        j++
      )
        isObjectExists[position.x + i][position.z + j] = true;

    set((state) => ({
      ...state,
      room: {
        ...state.room,
        objects: state.room.objects.map((e) =>
          e.item.id === state.room.selectedObjectId ? { ...e, position: position } : e
        ),
        isObjectExists,
      },
    }));
  },
  putItemIntoBag: () => {
    set((state) => ({
      ...state,
      room: {
        ...state.room,
        selectedObjectId: defaultState.room.selectedObjectId,
        objects: state.room.objects.filter((e) => e.item.id !== state.room.selectedObjectId),
      },
    }));
  },
  rotateSelectedObject: () => {
    const selectedItem = get().room.objects.find((e) => e.item.id === get().room.selectedObjectId);
    if (selectedItem === undefined) return;
    for (let i = 1; i <= 4; i++) {
      if (
        selectedItem.position.x +
          ((selectedItem.rotation + i) % 2 === 0
            ? selectedItem.item.size.depth
            : selectedItem.item.size.width) >
          12 ||
        selectedItem.position.z +
          ((selectedItem.rotation + i) % 2 === 1
            ? selectedItem.item.size.depth
            : selectedItem.item.size.width) >
          12
      )
        continue;

      set((state) => ({
        ...state,
        room: {
          ...state.room,
          objects: state.room.objects.map((e) => {
            if (e.item.id === state.room.selectedObjectId)
              return {
                ...e,
                rotation: (e.rotation + i) % 4,
              };
            else return e;
          }),
        },
      }));
      break;
    }
  },
}));

export { useDecorateRoomStore };
