import Head from "next/head";
import ProductPage from "../../component/ProductPage/Public";
import Topbar from "../../component/Topbar";
import Footer from "../../component/Footer";
// import { getProduct } from "../../_mocks_/products";
import { serverFetch } from "../../libs/axiosClient";
import SecondaryTheme from "../../theme/SecondaryThemeProvider";
import SetToGlobalState from "../../component/SetToGlobalState";

export default function Product({ product, categories, vendor }) {
  return (
    <div>
      <Head>
        <title>{product.productName} &nbsp; - EbizMart</title>
      </Head>
      <SecondaryTheme>
        <SetToGlobalState categories={categories} />
        <Topbar />
        <ProductPage product={product} vendor={vendor} />
        <Footer />
      </SecondaryTheme>
    </div>
  );
}

// export const getServerSideProps = async (context) => {
//   const fetch = serverFetch();
//   try {
//     const res = await fetch.get(`/products/${context.params.id}`);
//     const categoryRes = await fetch.get("/categories/getActiveCategories");
//     const vendorRes = await fetch.get(`/vendors/${res.data.product.vendorId}`);
//     //console.log(res.data.product.vendorId);
//     //console.log(vendorRes.data);
//     return {
//       props: {
//         product: res.data.product,
//         categories: categoryRes.data.data.categories,
//         vendor: vendorRes.data.vendor,
//       },
//     };
//   } catch (e) {
//     console.log(e);
//     return {
//       props: {
//         product: {},
//         categories: [],
//       },
//     };
//   }
// };

export const getServerSideProps = async ({ params }) => {
  const fetch = serverFetch();
  const res = await fetch.get(`/vendors/uniqueName/${params.id}`);
  console.log(res.data);
  const productsRes = await fetch.get(
    `/products/vendor/${res.data.vendor._id}`
  );
  const popularProductsRes = await fetch.get(
    `/products/trending/vendor/${res.data.vendor._id}`
  );
  const vendor = {
    ...res.data.vendor,
    location: { lat: -34.397, lng: 150.644 },
    reviews: [],
    products: productsRes.data.data.products.map(({ product }) => product),
    popularProducts: popularProductsRes.data.data.products.map(
      ({ product }) => product
    ),
  };
  return {
    props: {
      product : vendor.products[0],
      vendor: vendor,
      categories : []
    },
  };
};