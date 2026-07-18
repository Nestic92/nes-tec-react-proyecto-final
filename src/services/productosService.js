import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { db, hasFirebaseConfig } from "./firebase";

const STORAGE_KEY = "nes_tec_productos";

const normalizarProducto = (producto, id) => ({
  id: String(id ?? producto.id ?? Date.now()),
  nombre: producto.nombre || "",
  precio: Number(producto.precio) || 0,
  imagen: producto.imagen || "",
  categoria: producto.categoria || ""
});

const getLocalProducts = () => {
  const products = localStorage.getItem(STORAGE_KEY);
  return products ? JSON.parse(products) : [];
};

const saveLocalProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

const seedLocalProducts = async () => {
  const storedProducts = getLocalProducts();

  if (storedProducts.length > 0) {
    return storedProducts;
  }

  const response = await fetch("/productos.json");

  if (!response.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  const data = await response.json();
  const normalizedProducts = data.map((product) => normalizarProducto(product));

  saveLocalProducts(normalizedProducts);

  return normalizedProducts;
};

export const getProductos = async () => {
  if (hasFirebaseConfig && db) {
    const snapshot = await getDocs(collection(db, "productos"));

    return snapshot.docs.map((documento) =>
      normalizarProducto(documento.data(), documento.id)
    );
  }

  return seedLocalProducts();
};

export const getProductoPorId = async (id) => {
  if (hasFirebaseConfig && db) {
    const response = await getDoc(doc(db, "productos", String(id)));

    if (!response.exists()) {
      return null;
    }

    return normalizarProducto(response.data(), response.id);
  }

  const products = await seedLocalProducts();
  return products.find((product) => String(product.id) === String(id)) || null;
};

export const crearProducto = async (producto) => {
  const payload = {
    nombre: producto.nombre,
    precio: Number(producto.precio),
    imagen: producto.imagen,
    categoria: producto.categoria
  };

  if (hasFirebaseConfig && db) {
    const response = await addDoc(collection(db, "productos"), payload);

    return {
      id: response.id,
      ...payload
    };
  }

  const products = await seedLocalProducts();
  const newProduct = normalizarProducto(payload, Date.now());

  saveLocalProducts([...products, newProduct]);

  return newProduct;
};

export const editarProducto = async (id, producto) => {
  const payload = {
    nombre: producto.nombre,
    precio: Number(producto.precio),
    imagen: producto.imagen,
    categoria: producto.categoria
  };

  if (hasFirebaseConfig && db) {
    await updateDoc(doc(db, "productos", String(id)), payload);

    return {
      id: String(id),
      ...payload
    };
  }

  const products = await seedLocalProducts();
  const updatedProducts = products.map((product) =>
    String(product.id) === String(id)
      ? normalizarProducto(payload, id)
      : product
  );

  saveLocalProducts(updatedProducts);

  return normalizarProducto(payload, id);
};

export const eliminarProducto = async (id) => {
  if (hasFirebaseConfig && db) {
    await deleteDoc(doc(db, "productos", String(id)));
    return;
  }

  const products = await seedLocalProducts();
  const updatedProducts = products.filter((product) => String(product.id) !== String(id));

  saveLocalProducts(updatedProducts);
};
