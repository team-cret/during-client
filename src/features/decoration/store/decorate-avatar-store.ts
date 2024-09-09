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
  bottomSheetMode: 'three-rows' | 'one-row' | 'handle-only';
  bagItems: Array<AvatarItem>;
  shopItems: Array<AvatarItem>;
  avatarStyle: {
    [key in avatarDecorationCategoriesType]: AvatarItem | null;
  };
};

const defaultState: State = {
  mode: 1,
  category: avatarDecorationCategories[0],
  isPurchaseMode: false,
  purchaseItems: [],
  bottomSheetMode: 'handle-only',
  bagItems: [],
  shopItems: Array.from({ length: 41 }, (_, i) => avatarItems[i]),
  avatarStyle: {
    헤어: null,
    상의: null,
    하의: null,
    신발: null,
  },
};

type Action = {
  init: ({ avatarStyle }: { avatarStyle: State['avatarStyle'] }) => void;
  setMode: (mode: number) => void;
  setCategory: (category: avatarDecorationCategoriesType) => void;
  setIsPurchaseMode: (isPurchaseMode: boolean) => void;

  setBottomSheetMode: (mode: 'three-rows' | 'one-row' | 'handle-only') => void;

  selectBagItem: (id: number) => void;
  selectShopItem: (id: number) => void;
  togglePurchaseItem: (id: number) => void;
  confirmPurchase: () => {
    style: State['avatarStyle'];
  };
};

const useDecorateAvatarStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  init: ({ avatarStyle }) =>
    set({
      mode: defaultState.mode,
      category: defaultState.category,
      isPurchaseMode: defaultState.isPurchaseMode,
      purchaseItems: defaultState.purchaseItems,
      bottomSheetMode: defaultState.bottomSheetMode,
      bagItems: defaultState.bagItems,
      shopItems: defaultState.shopItems,
      avatarStyle,
    }),
  setMode: (mode) => set({ mode }),
  setCategory: (category) => set({ category }),
  setIsPurchaseMode: (isPurchaseMode) => set({ isPurchaseMode }),
  setBottomSheetMode: (bottomSheetMode) => set({ bottomSheetMode }),
  selectBagItem: (id) => {
    const selectedItem = avatarItems.find((item) => item.id === id);
    if (!selectedItem) return;

    if (
      get().avatarStyle[selectedItem.category] &&
      get().avatarStyle[selectedItem.category]?.id === id
    ) {
      set((state) => ({
        ...state,
        avatarStyle: { ...state.avatarStyle, [selectedItem.category]: null },
      }));
      return;
    } else {
      set((state) => ({
        ...state,
        avatarStyle: { ...state.avatarStyle, [selectedItem.category]: selectedItem },
      }));
      return;
    }
  },
  selectShopItem: (id) => {
    const selectedItem = avatarItems.find((item) => item.id === id);
    if (!selectedItem) return;
    if (
      get().avatarStyle[selectedItem.category] &&
      get().avatarStyle[selectedItem.category]?.id === id
    ) {
      set((state) => ({
        ...state,
        avatarStyle: { ...state.avatarStyle, [selectedItem.category]: null },
        purchaseItems: state.purchaseItems.filter((item) => item.item.id !== id),
      }));
    } else {
      set((state) => ({
        ...state,
        avatarStyle: { ...state.avatarStyle, [selectedItem.category]: selectedItem },
        purchaseItems: [...state.purchaseItems, { item: selectedItem, isSelected: true }],
      }));
    }
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
    const newAvatarStyle = get().avatarStyle;
    get().purchaseItems.forEach((item) => {
      if (item.isSelected) {
        newAvatarStyle[item.item.category] = item.item;
      }
    });
    return { style: newAvatarStyle };
  },
}));

export { useDecorateAvatarStore };
