const SUBSCRIPTIONS = [
  {
    type: "Básico",
    monthlyPrice: 55000,
    yearlyPrice: 627000, // Ahorra 5%
    features: [
      "Organiza a tu equipo",
      "Organiza tu inventario, proveedores y más",
      "Hasta 10 colaboradores"
    ]
  },
  {
    type: "Estándar",
    monthlyPrice: 95000,
    yearlyPrice: 1026000, // Ahorra 10%
    features: [
      "Todo lo incluído en el plan básico",
      "Conecta con proveedores a través de la plataforma",
      "Únete a una red interna de PYMES que usa el servicio y conviérte en proveedor",
      "Hasta 50 colaboradores"
    ]
  },
  {
    type: "Empresas",
    monthlyPrice: 200000,
    yearlyPrice: 2400000, // SIN AHORRO DEFINIDO, EL COSTE DE EMPRESA ES DESDE
    features: [
      "Plan personalizado",
      "Usuarios ilimitados",
      "Instancias dedicadas en tu región"
    ]
  }
]

export { SUBSCRIPTIONS }