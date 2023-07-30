import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [
  {
    name: "Buku Tulis",
    image:
      "https://a.ipricegroup.com/media/Gita/Kertas_Buku_Tulis_Sinar_Dunia.jpg",
    buyPrice: 1000,
    sellPrice: 3000,
    stock: 30,
  },
  {
    name: "Pensil",
    image:
      "https://asset.kompas.com/crops/o1K29R-sCa6DQ30jB0qKQwPDGWo=/0x229:4415x3173/750x500/data/photo/2021/10/09/61616eaf1884b.jpg",
    buyPrice: 1500,
    sellPrice: 5000,
    stock: 12,
  },
  {
    name: "Penghapus",
    image:
      "https://bimamedia-gurusiana.ap-south-1.linodeobjects.com/a305c17f85b99588ce35cb4e9cd6134f/2022/05/01/l-eb811799-3727-49a4-9390-0129b5f923e020220501102306.jpeg",
    buyPrice: 1500,
    sellPrice: 5000,
    stock: 12,
  },
  {
    name: "Pulpen",
    image:
      "https://i0.wp.com/pasyari.com/wp-content/uploads/2021/04/Pulpen-Pen-bolpoin-bolpen-Standard-AE7-0.5.png?fit=1001%2C1007&ssl=1",
    buyPrice: 1500,
    sellPrice: 5000,
    stock: 12,
  },
  {
    name: "Spidol",
    image: "https://static.bmdstatic.com/pk/product/medium/5ddf7a44bd8ff.jpg",
    buyPrice: 1500,
    sellPrice: 5000,
    stock: 12,
  },
  {
    name: "Rautan",
    image:
      "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-3445295/faber-castell_faber-castell-rautan-triangular_full02.jpg",
    buyPrice: 1500,
    sellPrice: 5000,
    stock: 12,
  },
];

export const productSlice = createSlice({
  name: "product",
  initialState: { value: initialStateValue },
  reducers: {
    decreaseStock: (state, action) => {
      const updateIdx = state.value.findIndex(
        (obj) => obj.name === action.payload
      );
      state.value[updateIdx].stock--;
    },

    increaseStock: (state, action) => {
      const updateIdx = state.value.findIndex(
        (obj) => obj.name === action.payload
      );
      state.value[updateIdx].stock++;
    },

    addProduct: (state, action) => {
      state.value.push(action.payload);
    },

    removeProduct: (state, action) => {
      state.value = state.value.filter(
        (product) => product.name !== action.payload
      );
    },

    editProduct: (state, action) => {
      console.log("RENDERED");
      console.log(action.payload);
      const updateIdx = state.value.findIndex(
        (obj) => obj.name === action.payload.name
      );
      state.value[updateIdx].buyPrice = action.payload.buyPrice;
      state.value[updateIdx].sellPrice = action.payload.sellPrice;
      state.value[updateIdx].stock = action.payload.stock;
    },
  },
});

export const {
  increaseStock,
  decreaseStock,
  addProduct,
  removeProduct,
  editProduct,
} = productSlice.actions;

export default productSlice.reducer;
