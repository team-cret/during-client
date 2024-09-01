import {
  avatarDecorationCategories,
  avatarDecorationCategoriesType,
  AvatarItem,
  avatarItems,
} from '@/src/shared';
import { create } from 'zustand';

type State = {
  mode: number; // 0 : shop, 1 : bag
  category: avatarDecorationCategoriesType;
  isPurchaseMode: boolean;
  purchaseItems: Array<{
    item: AvatarItem;
    isSelected: boolean;
  }>;
  bagItems: Array<AvatarItem>;
  shopItems: Array<AvatarItem>;
};

const defaultState: State = {
  mode: 1,
  category: avatarDecorationCategories[0],
  isPurchaseMode: false,
  purchaseItems: [],
  bagItems: [avatarItems[0]],
  shopItems: [avatarItems[0]],
};

type Action = {
  setMode: (mode: number) => void;
  setCategory: (category: avatarDecorationCategoriesType) => void;
  setIsPurchaseMode: (isPurchaseMode: boolean) => void;
  selectShopItem: (id: number) => void;
  togglePurchaseItem: (id: number) => void;
};

const useDecorateAvatarStore = create<State & Action>((set) => ({
  ...defaultState,

  //actions
  setMode: (mode) => set({ mode }),
  setCategory: (category) => set({ category }),
  setIsPurchaseMode: (isPurchaseMode) => set({ isPurchaseMode }),
  selectShopItem: (id) => {
    const selectedItem = avatarItems.find((item) => item.id === id);
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

export { useDecorateAvatarStore };
