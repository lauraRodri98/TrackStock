import React from 'react'
import { Document, Page, StyleSheet, Text, View, Image } from "@react-pdf/renderer";

export default function pdfinfo() {
  let datos = {
    valorTotal: 1000,  // Ejemplo de valor
    totalProductos: 50,  // Ejemplo de valor
  };
  

  const style = StyleSheet.create({
    page: {margin: 60},
    section:{
      alignContent:'center',
      height:30
    },
    titulo:{
      fontSize: 20,
      textAlign: 'center'
    },
    lista: {
      marginHorizontal:8
    },
    negrita: {
      fontWeight:'bold'
    },
  })


  return (
    <>
      <Document file="/pdfs/Informe-1.pdf">
        <Page size="A4">
          {/* Logo de la marca "Inventory" */}
          <View style={style.section}>
            <Image src="icono.png"></Image>
          </View>
          <View>
            <Text style={style.lista}>•</Text>
            <Text style={style.negrita}>Valor total del inventario: </Text>            
            <Text>{datos.valorTotal}</Text>
          </View>
          <View>
            <Text style={style.lista}>•</Text>
            <Text style={style.negrita}>Total productos Stock: </Text>         
            <Text>{datos.valorTotal}</Text>
          </View>
          <View>
            <Text style={style.lista}>•</Text>
            <Text style={style.negrita}>Total entradas devoluciones</Text>            
            <Text></Text>
          </View>
          <View>
            <Text style={style.lista}>•</Text>
            <Text style={style.negrita}>Salidas</Text>            
            <Text></Text>
          </View>
          <View>
            <Text style={style.lista}>•</Text>
            <Text style={style.negrita}>Entradas</Text>            
            <Text></Text>
          </View>

          <View>
            <Text style={style.titulo}>Productos Más Vendidos - Mes Actual</Text>
            <Text>Durante el mes actual, los cinco productos más vendidos han sido los siguientes:</Text>
            <Text style={style.negrita}>Producto A: X unidades</Text> <Text>vendidas, este producto ha sido el más demandado, destacándose por su excelente calidad y popularidad entre los clientes.</Text>
            <Text style={style.negrita}>Producto B: Y unidades</Text> <Text>vendidas, ha sido una opción preferida, destacando por su relación calidad-precio.</Text>
            <Text style={style.negrita}>Producto C: Z unidades</Text> <Text>vendidas, este producto ha sido muy bien recibido por los usuarios, convirtiéndose en uno de los más buscados.</Text>
            <Text style={style.negrita}>Producto D: W unidades</Text> <Text>vendidas, ha mantenido una alta demanda gracias a sus características únicas y su atractivo para el público.</Text>
            <Text style={style.negrita}>Producto E: V unidades</Text> <Text>vendidas, este producto ha continuado siendo una opción destacada, debido a su efectividad y versatilidad.</Text>   
            <Text>Estos productos han sido los más populares este mes, reflejando las preferencias y tendencias actuales de nuestros clientes.</Text>
          </View>

        </Page>
      </Document>
    </>
  )
}
