export interface SaveDataProps {
  manager: {
    email: string,
    name: string,
    phone: string,
  },
  company: {
    name: string
    email: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    domain: string,
    website: string,
    postalCode: string,
  },
  logoUrl: string,
  theme: {
    mainColor: string,
    estimatedUsers: string,
  },
  subscription: {
    type: string,
    preferenceId: string,
  }
  paymentinfo: {
    collectionId: string,
    collectionStatus: string,
    paymentId: string,
    status:   string,
    externalReference: string,
    paymentType: string,
    merchantOrderId: string,
    paymentMethodId: string,
    preferenceId: string,
    siteId: string,
    processingMode: string,
    merchantAccountId: string,

    companyId: string,
  }
}

const saveData = async ({ manager, company, logoUrl, theme, subscription, paymentinfo }: SaveDataProps) => {
  try {
    const res = await fetch('/api/save-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        manager,
        company,
        logoUrl,
        theme,
        subscription,
        paymentinfo
      })
    })

    const data = await res.json()
    return { data, status: 201 };
  } catch (error: any) {
    return {
      error: error.message, status: 500
    }
  }
}

export { saveData }