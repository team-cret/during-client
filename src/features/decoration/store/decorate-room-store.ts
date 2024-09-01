import {
  roomDecorationCategories,
  roomDecorationCategoriesType,
  RoomItem,
  roomItems,
} from '@/src/shared';
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
};

const defaultState: State = {
  mode: 1,
  category: roomDecorationCategories[0],
  isPurchaseMode: false,
  purchaseItems: [],
  bagItems: [roomItems[0], roomItems[1], roomItems[2], roomItems[3], roomItems[4], roomItems[5]],
  shopItems: [roomItems[0], roomItems[1], roomItems[2], roomItems[3]],
};

type Action = {
  setMode: (mode: number) => void;
  setCategory: (category: roomDecorationCategoriesType) => void;
  setIsPurchaseMode: (isPurchaseMode: boolean) => void;
  selectShopItem: (id: number) => void;
  togglePurchaseItem: (id: number) => void;
};

const useDecorateRoomStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  setMode: (mode) => set({ mode }),
  setCategory: (category) => set({ category }),
  setIsPurchaseMode: (isPurchaseMode) => set({ isPurchaseMode }),
  selectShopItem: (id) => {
    const selectedItem = get().shopItems.find((item) => item.id === id);
    if (!selectedItem) return;
    set((state) => ({
      ...state,
      purchaseItems: [...state.purchaseItems, { item: selectedItem, isSelected: true }],
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
}));

export { useDecorateRoomStore };
