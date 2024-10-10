import { getAvatarBagAPI, getAvatarShopAPI, purchaseAvatarObjectAPI } from '@/src/entities';
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
    id: string;
    isSelected: boolean;
  }>;
  bottomSheetMode: 'three-rows' | 'one-row' | 'handle-only';
  bagItems: Array<string>;
  shopItems: Array<string>;
  avatarStyle: {
    [key in avatarDecorationCategoriesType]: string | null;
  };
};

const defaultState: State = {
  mode: 1,
  category: avatarDecorationCategories[0],
  isPurchaseMode: false,
  purchaseItems: [],
  bottomSheetMode: 'handle-only',
  bagItems: [],
  shopItems: [],
  avatarStyle: {
    헤어: null,
    상의: null,
    하의: null,
    신발: null,
  },
};

type Action = {
  init: ({ avatarStyle }: { avatarStyle: State['avatarStyle'] }) => Promise<boolean>;
  setMode: (mode: number) => void;
  setCategory: (category: avatarDecorationCategoriesType) => void;
  setIsPurchaseMode: (isPurchaseMode: boolean) => void;

  setBottomSheetMode: (mode: 'three-rows' | 'one-row' | 'handle-only') => void;

  selectBagItem: (id: string) => void;
  selectShopItem: (id: string) => void;
  togglePurchaseItem: (id: string) => void;

  ////구매하기
  //수정된 스타일 오브젝트는 수정된 값으로, 수정되지 않은 스타일 오브젝트는 null 반환
  confirmPurchase: ({ userRole }: { userRole: 'ROLE_SINGLE' | 'ROLE_COUPLE' | null }) => Promise<{
    style: State['avatarStyle'];
  }>;
};

const useDecorateAvatarStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  init: async ({ avatarStyle }) => {
    const bagItems = await getAvatarBagAPI();
    const shopItems = await getAvatarShopAPI();

    set({
      ...defaultState,
      bagItems,
      shopItems,
      avatarStyle,
    });
    return true;
  },
  setMode: (mode) => set({ mode }),
  setCategory: (category) => set({ category }),
  setIsPurchaseMode: (isPurchaseMode) => set({ isPurchaseMode }),
  setBottomSheetMode: (bottomSheetMode) => set({ bottomSheetMode }),
  selectBagItem: (id) => {
    const selectedItemCategory = avatarItems[id].category;
    if (!selectedItemCategory) return;

    if (get().avatarStyle[selectedItemCategory] === id) {
      set((state) => ({
        ...state,
        avatarStyle: { ...state.avatarStyle, [selectedItemCategory]: null },
        purchaseItems: state.purchaseItems.filter((item) => item.id !== id),
      }));
    } else {
      set((state) => ({
        ...state,
        avatarStyle: { ...state.avatarStyle, [selectedItemCategory]: id },
      }));
    }
  },
  selectShopItem: (id) => {
    const selectedItemCategory = avatarItems[id].category;
    if (!selectedItemCategory) return;
    if (get().avatarStyle[selectedItemCategory] === id) {
      set((state) => ({
        ...state,
        avatarStyle: { ...state.avatarStyle, [selectedItemCategory]: null },
        purchaseItems: state.purchaseItems.filter((item) => item.id !== id),
      }));
    } else {
      set((state) => ({
        ...state,
        avatarStyle: { ...state.avatarStyle, [selectedItemCategory]: id },
        purchaseItems: [
          ...state.purchaseItems.filter(
            (item) => avatarItems[item.id].category !== selectedItemCategory
          ),
          { id, isSelected: true },
        ],
      }));
    }
  },
  togglePurchaseItem: (id) => {
    set((state) => ({
      ...state,
      purchaseItems: state.purchaseItems.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      ),
    }));
  },
  confirmPurchase: async ({ userRole }) => {
    const purchaseResult =
      userRole == 'ROLE_SINGLE'
        ? true
        : await purchaseAvatarObjectAPI(get().purchaseItems.filter((item) => item.isSelected));
    if (!purchaseResult)
      return {
        style: defaultState.avatarStyle,
      };

    const newAvatarStyle = get().avatarStyle;
    get().purchaseItems.forEach((item) => {
      if (item.isSelected) return;
      newAvatarStyle[avatarItems[item.id].category] = null;
    });

    return { style: newAvatarStyle };
  },
}));

export { useDecorateAvatarStore };
