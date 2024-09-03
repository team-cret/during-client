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
    }>;
    selectedObjectId: number;
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
    }>;
  };

  selectObject: (id: number) => void;
  deselectObject: () => void;
  moveObject: (position: THREE.Vector3) => void;
};

const useDecorateRoomStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  init: ({ background, objects }) =>
    set({
      mode: defaultState.mode,
      category: defaultState.category,
      isPurchaseMode: defaultState.isPurchaseMode,
      purchaseItems: defaultState.purchaseItems,
      bagItems: defaultState.bagItems,
      shopItems: defaultState.shopItems,
      room: { background, objects, selectedObjectId: defaultState.room.selectedObjectId },
    }),
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
            },
          ],
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
            },
          ],
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

  selectObject: (id) => {
    set((state) => ({
      ...state,
      room: {
        ...state.room,
        selectedObjectId: id,
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
  moveObject: (position) => {
    if (get().room.selectedObjectId === defaultState.room.selectedObjectId) return;
    if (position.x < 0 || position.x > 12 || position.z < 0 || position.z > 12) return;
    set((state) => ({
      ...state,
      room: {
        ...state.room,
        objects: state.room.objects.map((e) =>
          e.item.id === state.room.selectedObjectId ? { ...e, position: position } : e
        ),
      },
    }));
  },
}));

export { useDecorateRoomStore };
