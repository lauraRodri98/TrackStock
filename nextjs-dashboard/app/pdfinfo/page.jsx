import React from 'react';
import { Document, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer';

export default function PDF_info() {
  const styles = StyleSheet.create({
    page: { margin: 60 },
    section: { alignItems: 'center', marginBottom: 20 },
    titulo: { fontSize: 20, textAlign: 'center', marginBottom: 10 },
    lista: { marginBottom: 10 },
    negrita: { fontWeight: 'bold' },
    imagen: { width: 50, height: 50, marginBottom: 10 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo de la marca */}
        <View style={styles.section}>
          <Image style={styles.imagen} src="/icono.png" />
        </View>

        {/* Sección de estadísticas */}
        <View>
          <Text style={styles.lista}>
            • <Text style={styles.negrita}>Valor total del inventario:</Text> 100,000€
          </Text>
          <Text style={styles.lista}>
            • <Text style={styles.negrita}>Total productos en stock:</Text> 1,500 unidades
          </Text>
          <Text style={styles.lista}>
            • <Text style={styles.negrita}>Total entradas (devoluciones):</Text> 200 unidades
          </Text>
          <Text style={styles.lista}>
            • <Text style={styles.negrita}>Total salidas:</Text> 300 unidades
          </Text>
        </View>

        {/* Productos más vendidos */}
        <View>
          <Text style={styles.titulo}>Productos Más Vendidos - Mes Actual</Text>
          <Text>Durante el mes actual, los cinco productos más vendidos han sido los siguientes:</Text>
          <Text style={styles.lista}>
            <Text style={styles.negrita}>Producto A:</Text> 50 unidades vendidas.
          </Text>
          <Text style={styles.lista}>
            <Text style={styles.negrita}>Producto B:</Text> 40 unidades vendidas.
          </Text>
          <Text style={styles.lista}>
            <Text style={styles.negrita}>Producto C:</Text> 35 unidades vendidas.
          </Text>
          <Text style={styles.lista}>
            <Text style={styles.negrita}>Producto D:</Text> 30 unidades vendidas.
          </Text>
          <Text style={styles.lista}>
            <Text style={styles.negrita}>Producto E:</Text> 25 unidades vendidas.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
