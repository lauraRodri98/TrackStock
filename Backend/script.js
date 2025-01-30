const mongoose = require('mongoose');
const Product = require('./models/Product'); // Ruta del modelo de Producto
const Movement = require('./models/Movement'); // Ruta del modelo de Movimiento
const Category = require('./models/Category'); // Ruta del modelo de Category
const Subcategory = require('./models/Subcategory'); // Ruta del modelo de Subcategory
const Supplier = require('./models/Supplier'); // Ruta del modelo de Supplier

async function insertData() {
  try {
    // Conexión a la base de datos
    await mongoose.connect('mongodb://localhost/Inventory')
      .then(() => console.log('Conectado a la base de datos'))
      .catch((error) => console.error('Error al conectar a la base de datos:', error));

    // Inserción de categorías
    const categories = [
      {
        name: "Electrónica",
        description: "Productos electrónicos como teléfonos, computadoras, etc.",
        imagen: "ordenador-portatil.png"
      },
      {
        name: "Ropa",
        description: "Ropa de diferentes tipos y tallas.",
        imagen: "camiseta.png"
      },
      {
        name: "Hogar",
        description: "Productos para el hogar como electrodomésticos, utensilios, etc.",
        imagen: "cajon.png"
      },
      {
        name: "Deportes",
        description: "Artículos deportivos como ropa, calzado y accesorios.",
        imagen: "raqueta.png"
      },
      {
        name: "Juguetes",
        description: "Juguetes y juegos para niños de todas las edades.",
        imagen: "oso-peluche.png"
      }
    ];

    const insertedCategories = await Category.insertMany(categories);
    console.log("Categorías insertadas:----------------------------------Categorias", insertedCategories);

    // Inserción de subcategorías
    const subcategories = [
      {
        name: "Teléfonos",
        categoryId: insertedCategories[0]._id,
        description: "Teléfonos móviles de diversas marcas."
      },
      {
        name: "Computadoras",
        categoryId: insertedCategories[0]._id,
        description: "Computadoras de escritorio y portátiles."
      },
      {
        name: "Camisetas",
        categoryId: insertedCategories[1]._id,
        description: "Camisetas de diferentes colores y tallas."
      },
      {
        name: "Electrodomésticos",
        categoryId: insertedCategories[2]._id,
        description: "Electrodomésticos para el hogar como microondas, neveras, etc."
      },
      {
        name: "Smart Home Devices",
        categoryId: insertedCategories[2]._id,
        description: "Devices to automate and enhance your home."
      },
      {
        name: "Accessories",
        categoryId: insertedCategories[1]._id,
        description: "Fashion accessories like belts, hats, and scarves."
      }
    ];

    const insertedSubcategories = await Subcategory.insertMany(subcategories);
    console.log("Subcategorías insertadas:", insertedSubcategories);

    // -----------añadir supplier aqui

  
  
    function generateProductId() {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      
      let productId = '';
      
      // Generar las 3 primeras letras
      for (let i = 0; i < 3; i++) {
        productId += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      
      // Generar los 3 últimos números
      for (let i = 0; i < 3; i++) {
        productId += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }
    
      return productId;
    }

  // Inserción de proveedores
  const suppliers = [
    {
      name: "TechWorld",
      email: "contact@techworld.com",
      phone: "123456789",
      address: "123 Tech Street, Silicon Valley",
    },
    {
      name: "FashionHub",
      email: "hello@fashionhub.com",
      phone: "987654321",
      address: "456 Style Avenue, New York",
    },
    {
      name: "HomeEquip",
      email: "info@homeequip.com",
      phone: "555123456",
      address: "789 Appliance Road, Chicago",
    }
  ];
    
    const insertedSuppliers = await Supplier.insertMany(suppliers);

    
    // Inserción de productos con referencias a categorías y subcategorías
    const products = [
      {
        name: "Smartphone",
        id_producto: generateProductId(),
        description: "Latest model with advanced features",
        price: 699,
        quantity: 50,
        imagen: "smartphone.png",
        size: "5.5 inches",
        color: "Black",
        category: insertedCategories[0]._id,
        subCategory: insertedSubcategories[0]._id,
        supplier: insertedSuppliers[0]._id // Proveedor "TechWorld"
      },
      {
        name: "T-shirt",
        id_producto: generateProductId(),
        description: "Comfortable cotton t-shirt",
        price: 19,
        quantity: 200,
        imagen: "tshirt.png",
        size: "L",
        color: "Blue",
        category: insertedCategories[1]._id,
        subCategory: insertedSubcategories[2]._id,
        supplier: insertedSuppliers[1]._id // Proveedor "FashionHub"
      },
      {
        name: "Microwave Oven",
        id_producto: generateProductId(),
        description: "Compact microwave oven with grill",
        price: 150,
        quantity: 30,
        imagen: "microwave.png",
        size: null,
        color: "Silver",
        category: insertedCategories[2]._id,
        subCategory: insertedSubcategories[3]._id,
        supplier: insertedSuppliers[2]._id // Proveedor "HomeEquip"
      },
      {
        name: "Laptop",
        id_producto: generateProductId(),
        description: "High performance laptop for work and play",
        price: 1200,
        quantity: 5,
        imagen: "laptop.png",
        size: "15 inches",
        color: "Gray",
        category: insertedCategories[0]._id,
        subCategory: insertedSubcategories[1]._id,
        supplier: insertedSuppliers[0]._id // Proveedor "TechWorld"
      },
      {
        name: "Blender",
        id_producto: generateProductId(),
        description: "Powerful blender for smoothies and shakes",
        price: 100,
        quantity: 8,
        imagen: "blender.png",
        size: "Medium",
        color: "Red",
        category: insertedCategories[2]._id,
        subCategory: insertedSubcategories[3]._id,
        supplier: insertedSuppliers[2]._id // Proveedor "HomeEquip"
      },
      {
        name: "Toaster",
        id_producto: generateProductId(),
        description: "2-slice toaster with adjustable settings",
        price: 50,
        quantity: 12,
        imagen: "toaster.png",
        size: null,
        color: "Black",
        category: insertedCategories[2]._id,
        subCategory: insertedSubcategories[3]._id,
        supplier: insertedSuppliers[2]._id // Proveedor "HomeEquip"
      },
      {
        name: "Smartwatch",
        id_producto: generateProductId(),
        description: "Wearable device with health tracking features",
        price: 199,
        quantity: 40,
        imagen: "smartwatch.png",
        size: "1.5 inches",
        color: "Silver",
        category: insertedCategories[0]._id,
        subCategory: insertedSubcategories[0]._id,
        supplier: insertedSuppliers[0]._id // Proveedor "TechWorld"
      },
      {
        name: "Jeans",
        id_producto: generateProductId(),
        description: "Comfortable and stylish denim jeans",
        price: 49,
        quantity: 150,
        imagen: "jeans.png",
        size: "M",
        color: "Blue",
        category: insertedCategories[1]._id,
        subCategory: insertedSubcategories[2]._id,
        supplier: insertedSuppliers[1]._id // Proveedor "FashionHub"
      },
      {
        name: "Refrigerator",
        id_producto: generateProductId(),
        description: "Energy-efficient refrigerator with large capacity",
        price: 899,
        quantity: 20,
        imagen: "refrigerator.png",
        size: "Large",
        color: "White",
        category: insertedCategories[2]._id,
        subCategory: insertedSubcategories[3]._id,
        supplier: insertedSuppliers[2]._id // Proveedor "HomeEquip"
      },
      {
        name: "Tablet",
        id_producto: generateProductId(),
        description: "Lightweight tablet for work and entertainment",
        price: 499,
        quantity: 25,
        imagen: "tablet.png",
        size: "10 inches",
        color: "Black",
        category: insertedCategories[0]._id,
        subCategory: insertedSubcategories[1]._id,
        supplier: insertedSuppliers[0]._id // Proveedor "TechWorld"
      },
      {
        name: "Mixer",
        id_producto: generateProductId(),
        description: "Kitchen mixer for baking and cooking",
        price: 120,
        quantity: 15,
        imagen: "mixer.png",
        size: "Medium",
        color: "White",
        category: insertedCategories[2]._id,
        subCategory: insertedSubcategories[3]._id,
        supplier: insertedSuppliers[2]._id // Proveedor "HomeEquip"
      },
      {
        name: "Sneakers",
        id_producto: generateProductId(),
        description: "Comfortable sneakers for daily wear",
        price: 75,
        quantity: 100,
        imagen: "sneakers.png",
        size: "42",
        color: "White",
        category: insertedCategories[1]._id,
        subCategory: insertedSubcategories[2]._id,
        supplier: insertedSuppliers[1]._id
      },
      {
        name: "Balón de Fútbol",
        id_producto: generateProductId(),
        description: "Balón de fútbol de alta calidad para partidos y entrenamientos",
        price: 30,
        quantity: 50,
        imagen: "balon_futbol.png",
        size: "Tamaño estándar",
        color: "Rojo",
        category: insertedCategories[0]._id,
        subCategory: insertedSubcategories[0]._id,
        supplier: insertedSuppliers[0]._id // Proveedor "SportsGear"
      },
      {
        name: "Zapatillas para Correr",
        id_producto: generateProductId(),
        description: "Zapatillas cómodas y ligeras para correr",
        price: 60,
        quantity: 80,
        imagen: "zapatillas_correr.png",
        size: "42",
        color: "Negro",
        category: insertedCategories[1]._id,
        subCategory: insertedSubcategories[1]._id,
        supplier: insertedSuppliers[1]._id // Proveedor "FitShoes"
      },
      {
        name: "Pesas de Mano",
        id_producto: generateProductId(),
        description: "Pesas de mano ideales para entrenamiento de fuerza",
        price: 25,
        quantity: 60,
        imagen: "pesas_mano.png",
        size: "1-5 kg",
        color: "Azul",
        category: insertedCategories[0]._id,
        subCategory: insertedSubcategories[2]._id,
        supplier: insertedSuppliers[0]._id // Proveedor "FitnessPro"
      },
      {
        name: "Set de Construcción",
        id_producto: generateProductId(),
        description: "Set de construcción para niños, fomenta la creatividad",
        price: 40,
        quantity: 120,
        imagen: "set_construccion.png",
        size: "Grande",
        color: "Multicolor",
        category: insertedCategories[2]._id,
        subCategory: insertedSubcategories[3]._id,
        supplier: insertedSuppliers[2]._id // Proveedor "ToyWorld"
      },
      {
        name: "Muñeca Interactiva",
        id_producto: generateProductId(),
        description: "Muñeca interactiva con sonidos y movimientos",
        price: 50,
        quantity: 90,
        imagen: "muneca_interactiva.png",
        size: "Estándar",
        color: "Rosa",
        category: insertedCategories[2]._id,
        subCategory: insertedSubcategories[3]._id,
        supplier: insertedSuppliers[2]._id // Proveedor "ToyWorld"
      },
      {
        name: "Camión de Juguete",
        id_producto: generateProductId(),
        description: "Camión de juguete con ruedas y luces",
        price: 35,
        quantity: 70,
        imagen: "camion_juguete.png",
        size: "Mediano",
        color: "Rojo",
        category: insertedCategories[2]._id,
        subCategory: insertedSubcategories[3]._id,
        supplier: insertedSuppliers[2]._id // Proveedor "ToyWorld"
      }
    ];

    const insertedProducts = await Product.insertMany(products);

    console.log("Productos insertados: linea de cod 267 ---------------------------------- ", insertedProducts);


   
    // Inserción de movimientos (algunos sin movimiento en los últimos 3 meses)
    const movements = [
      {
        product_id: insertedProducts[0]._id, // Smartphone
        type: "entrada",
        quantity: 1,
        date: "2024-1-15",
        comment: "Small restock of Smartphones"
      },
      {
        product_id: insertedProducts[0]._id, // Smartphone
        type: "salida",
        quantity: 1,
        date: "2024-2-10",
        comment: "Sold Smartphones to a client"
      },
      {
        product_id: insertedProducts[2]._id, // Microwave Oven
        type: "entrada",
        quantity: 2,
        date: "2024-3-05",
        comment: "Restock of Microwave Ovens"
      },
      {
        product_id: insertedProducts[2]._id, // Microwave Oven
        type: "salida",
        quantity: 2,
        date: "2024-4-12",
        comment: "Sold Microwave Ovens to a client"
      },
      {
        product_id: insertedProducts[3]._id, // Laptop
        type: "entrada",
        quantity: 2,
        date: "2024-5-20",
        comment: "New batch of Laptops"
      },
      {
        product_id: insertedProducts[3]._id, // Laptop
        type: "salida",
        quantity: 1,
        date: "2024-6-18",
        comment: "Laptop sold to a client"
      },
      {
        product_id: insertedProducts[10]._id, // Tablet
        type: "entrada",
        quantity: 2,
        date: "2024-6-25",
        comment: "Restock of Tablets"
      },
      {
        product_id: insertedProducts[10]._id, // Tablet
        type: "salida",
        quantity: 4,
        date: "2024-8-14",
        comment: "Tablets sold during a promotion"
      },
      {
        product_id: insertedProducts[6]._id, // Smartwatch
        type: "entrada",
        quantity:3,
        date: "2024-8-10",
        comment: "Restock of Smartwatches"
      },
      {
        product_id: insertedProducts[6]._id, // Smartwatch
        type: "salida",
        quantity: 2,
        date: "2024-10-05",
        comment: "Smartwatches sold in a bundle"
      },
      {
        product_id: insertedProducts[0]._id, // Smartphone
        type: "entrada",
        quantity: 4,
        date: "2024-11-12",
        comment: "Additional restock of Smartphones"
      },
      {
        product_id: insertedProducts[0]._id, // Smartphone
        type: "salida",
        quantity: 2,
        date: "2024-12-03",
        comment: "Smartphones sold during holiday season"
      },
      {
        product_id: insertedProducts[1]._id, // T-shirt
        type: "entrada",
        quantity: 20,
        date: "2024-1-10",
        comment: "Restock of T-shirts"
      },
      {
        product_id: insertedProducts[1]._id, // T-shirt
        type: "salida",
        quantity: 15,
        date: "2024-2-15",
        comment: "Sold T-shirts during a sale"
      },
      {
        product_id: insertedProducts[7]._id, // Jeans
        type: "entrada",
        quantity: 30,
        date: "2024-3-20",
        comment: "New batch of Jeans arrived"
      },
      {
        product_id: insertedProducts[7]._id, // Jeans
        type: "salida",
        quantity: 18,
        date: "2024-4-05",
        comment: "Jeans sold during promotion"
      },
      {
        product_id: insertedProducts[11]._id, // Sneakers
        type: "entrada",
        quantity: 15,
        date: "2024-5-15",
        comment: "Restock of Sneakers"
      },
      {
        product_id: insertedProducts[11]._id, // Sneakers
        type: "salida",
        quantity: 10,
        date: "2024-6-10",
        comment: "Sneakers sold to customers"
      },
      {
        product_id: insertedProducts[1]._id, // T-shirt
        type: "entrada",
        quantity: 25,
        date: "2024-6-08",
        comment: "Summer collection T-shirts"
      },
      {
        product_id: insertedProducts[1]._id, // T-shirt
        type: "salida",
        quantity: 20,
        date: "2024-8-12",
        comment: "T-shirts sold during summer sale"
      },
      {
        product_id: insertedProducts[7]._id, // Jeans
        type: "entrada",
        quantity: 20,
        date: "2024-8-18",
        comment: "Restock of Jeans"
      },
      {
        product_id: insertedProducts[7]._id, // Jeans
        type: "salida",
        quantity: 15,
        date: "2024-10-22",
        comment: "Jeans sold during autumn sale"
      },
      {
        product_id: insertedProducts[11]._id, // Sneakers
        type: "entrada",
        quantity: 10,
        date: "2024-11-05",
        comment: "Additional restock of Sneakers"
      },
      {
        product_id: insertedProducts[11]._id, // Sneakers
        type: "salida",
        quantity: 8,
        date: "2024-12-20",
        comment: "Sneakers sold during holiday season"
      },
      {
        product_id: insertedProducts[2]._id, // Microwave Oven
        type: "salida",
        quantity: 3,
        date: "2024-1-15", // Enero
        comment: "Microwave Oven sold during New Year offers"
      },
      {
        product_id: insertedProducts[4]._id, // Blender
        type: "salida",
        quantity: 2,
        date: "2024-1-10", // Febrero
        comment: "Blender sold for Valentine's Day preparation"
      },
      {
        product_id: insertedProducts[2]._id, // Microwave Oven
        type: "salida",
        quantity: 4,
        date: "2024-2-05", // Marzo
        comment: "Microwave Oven sold as part of spring discounts"
      },
      {
        product_id: insertedProducts[4]._id, // Blender
        type: "salida",
        quantity: 3,
        date: "2024-3-12", // Abril
        comment: "Blender sold during Easter promotions"
      },
      {
        product_id: insertedProducts[2]._id, // Microwave Oven
        type: "salida",
        quantity: 1,
        date: "2024-4-20", // Mayo
        comment: "Microwave Oven sold for Mother's Day gifts"
      },
      {
        product_id: insertedProducts[4]._id, // Blender
        type: "salida",
        quantity: 2,
        date: "2024-5-18", // Junio
        comment: "Blender sold for summer smoothie season"
      },
      {
        product_id: insertedProducts[2]._id, // Microwave Oven
        type: "salida",
        quantity: 3,
        date: "2024-6-07", // Julio
        comment: "Microwave Oven sold during summer sales"
      },
      {
        product_id: insertedProducts[4]._id, // Blender
        type: "salida",
        quantity: 4,
        date: "2024-7-25", // Agosto
        comment: "Blender sold for back-to-school meal prep"
      },
      {
        product_id: insertedProducts[2]._id, // Microwave Oven
        type: "salida",
        quantity: 3,
        date: "2024-8-10", // Septiembre
        comment: "Microwave Oven sold for fall season cooking"
      },
      {
        product_id: insertedProducts[4]._id, // Blender
        type: "salida",
        quantity: 3,
        date: "2024-9-15", // Octubre
        comment: "Blender sold during Halloween discounts"
      },
      {
        product_id: insertedProducts[2]._id, // Microwave Oven
        type: "salida",
        quantity: 5,
        date: "2024-10-20", // Noviembre
        comment: "Microwave Oven sold for Thanksgiving preparation"
      },
      {
        product_id: insertedProducts[4]._id, // Blender
        type: "salida",
        quantity: 2,
        date: "2024-11-05", // Diciembre
        comment: "Blender sold during holiday gift shopping"
      },
      {
        product_id: insertedProducts[12]._id, // Balón de Fútbol ??
        type: "salida",
        quantity: 10,
        date: "2024-12-10", // Enero
        comment: "Balón de fútbol vendido durante el inicio de la temporada"
      },
      {
        product_id: insertedProducts[13]._id, // Zapatillas para Correr
        type: "salida",
        quantity: 5,
        date: "2024-1-15", // Febrero
        comment: "Zapatillas para correr vendidas en promociones de San Valentín"
      },
      {
        product_id: insertedProducts[14]._id, // Pesas de Mano
        type: "salida",
        quantity: 8,
        date: "2024-2-20", // Marzo
        comment: "Pesas de mano vendidas para preparación de primavera"
      },
      {
        product_id: insertedProducts[12]._id, // Balón de Fútbol
        type: "salida",
        quantity: 12,
        date: "2024-3-05", // Abril
        comment: "Balón de fútbol vendido durante eventos deportivos locales"
      },
      {
        product_id: insertedProducts[13]._id, // Zapatillas para Correr
        type: "salida",
        quantity: 7,
        date: "2024-4-18", // Mayo
        comment: "Zapatillas para correr vendidas para competiciones escolares"
      },
      {
        product_id: insertedProducts[14]._id, // Pesas de Mano
        type: "salida",
        quantity: 6,
        date: "2024-5-25", // Junio
        comment: "Pesas de mano vendidas para entrenamientos de verano"
      },
      {
        product_id: insertedProducts[12]._id, // Balón de Fútbol
        type: "salida",
        quantity: 15,
        date: "2024-6-10", // Julio
        comment: "Balón de fútbol vendido durante torneos de verano"
      },
      {
        product_id: insertedProducts[13]._id, // Zapatillas para Correr
        type: "salida",
        quantity: 9,
        date: "2024-7-22", // Agosto
        comment: "Zapatillas para correr vendidas para preparación de maratones"
      },
      {
        product_id: insertedProducts[14]._id, // Pesas de Mano
        type: "salida",
        quantity: 4,
        date: "2024-8-12", // Septiembre
        comment: "Pesas de mano vendidas para entrenamientos de otoño"
      },
      {
        product_id: insertedProducts[12]._id, // Balón de Fútbol
        type: "salida",
        quantity: 8,
        date: "2024-9-30", // Octubre
        comment: "Balón de fútbol vendido durante promociones de Halloween"
      },
      {
        product_id: insertedProducts[13]._id, // Zapatillas para Correr
        type: "salida",
        quantity: 10,
        date: "2024-10-05", // Noviembre
        comment: "Zapatillas para correr vendidas en Black Friday"
      },
      {
        product_id: insertedProducts[14]._id, // Pesas de Mano
        type: "salida",
        quantity: 5,
        date: "2024-11-15", // Diciembre
        comment: "Pesas de mano vendidas como regalos de Navidad"
      },
      {
        product_id: insertedProducts[15]._id, // Set de Construcción
        type: "salida",
        quantity: 20,
        date: "2024-12-10", // Enero
        comment: "Set de construcción vendido como regalo de Año Nuevo"
      },
      {
        product_id: insertedProducts[16]._id, // Muñeca Interactiva
        type: "salida",
        quantity: 15,
        date: "2024-1-20", // Febrero
        comment: "Muñeca interactiva vendida para el Día de San Valentín"
      },
      {
        product_id: insertedProducts[17]._id, // Camión de Juguete
        type: "salida",
        quantity: 10,
        date: "2024-2-15", // Marzo
        comment: "Camión de juguete vendido durante las vacaciones de primavera"
      },
      {
        product_id: insertedProducts[15]._id, // Set de Construcción
        type: "salida",
        quantity: 25,
        date: "2024-3-05", // Abril
        comment: "Set de construcción vendido para actividades escolares"
      },
      {
        product_id: insertedProducts[16]._id, // Muñeca Interactiva
        type: "salida",
        quantity: 18,
        date: "2024-4-10", // Mayo
        comment: "Muñeca interactiva vendida para celebraciones del Día de la Madre"
      },
      {
        product_id: insertedProducts[17]._id, // Camión de Juguete
        type: "salida",
        quantity: 12,
        date: "2024-5-20", // Junio
        comment: "Camión de juguete vendido para vacaciones de verano"
      },
      {
        product_id: insertedProducts[15]._id, // Set de Construcción
        type: "salida",
        quantity: 30,
        date: "2024-6-15", // Julio
        comment: "Set de construcción vendido durante campamentos de verano"
      },
      {
        product_id: insertedProducts[16]._id, // Muñeca Interactiva
        type: "salida",
        quantity: 20,
        date: "2024-7-05", // Agosto
        comment: "Muñeca interactiva vendida para vacaciones familiares"
      },
      {
        product_id: insertedProducts[17]._id, // Camión de Juguete
        type: "salida",
        quantity: 8,
        date: "2024-8-20", // Septiembre
        comment: "Camión de juguete vendido durante la vuelta al cole"
      },
      {
        product_id: insertedProducts[15]._id, // Set de Construcción
        type: "salida",
        quantity: 15,
        date: "2024-9-10", // Octubre
        comment: "Set de construcción vendido durante Halloween"
      },
      {
        product_id: insertedProducts[16]._id, // Muñeca Interactiva
        type: "salida",
        quantity: 25,
        date: "2024-10-15", // Noviembre
        comment: "Muñeca interactiva vendida en Black Friday"
      },
      {
        product_id: insertedProducts[17]._id, // Camión de Juguete
        type: "salida",
        quantity: 18,
        date: "2024-11-25", // Diciembre
        comment: "Camión de juguete vendido como regalo de Navidad"
      }
    ];    

    await Movement.insertMany(movements);
    console.log("Movimientos insertados correctamente");

  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    // Cerrar la conexión a la base de datos
    mongoose.connection.close();
  }
}

// Ejecutar el script
insertData();

module.exports = {
  insertData
}
