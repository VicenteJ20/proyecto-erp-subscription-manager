import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface AccountStateProps {
  manager: {
    name: string,
    email: string,
    phone: string,
  },
  company: {
    email: string,
    name: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    postalCode: string,
    website?: string,
    logo?: string,
  },
  theme: {
    mainColor: string,
    fontFamily: string,
    estimatedUsers: string,
  },
  subscription: {
    selectedPlan: string,
    version: number,
    applicationId: string,
    reason: string,
    externalReference: number,
    back_url: string,
    auto_recurring: {
      frecuency: number,
      frecuencyType: string,
      startDate: string,
      endDate: string,
      currecyId: string,
      transactionAmount: number,
      freeTrial: {
        frecuency: number,
        frecuencyType: string,
      }
    },
    payerId: number,
    cardId: number,
    paymentMethodId: number,
    nextPaymentDate: string,
    lastModified: string,
    status: string,
  }
}

const initialState: AccountStateProps = {
  manager: {
    name: '',
    email: '',
    phone: '',
  },
  company: {
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    website: '',
    logo: '',
  },
  theme: {
    mainColor: '',
    fontFamily: '',
    estimatedUsers: '',
  },
  subscription: {
    selectedPlan: '',
    version: 0,
    applicationId: '',
    reason: '',
    externalReference: 0,
    back_url: '',
    auto_recurring: {
      frecuency: 0,
      frecuencyType: '',
      startDate: '',
      endDate: '',
      currecyId: '',
      transactionAmount: 0,
      freeTrial: {
        frecuency: 0,
        frecuencyType: '',
      }
    },
    payerId: 0,
    cardId: 0,
    paymentMethodId: 0,
    nextPaymentDate: '',
    lastModified: '',
    status: '',
  }
}


export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setManager: (state, action: PayloadAction<AccountStateProps['manager']>) => {
      state.manager = action.payload
    },
    setCompany: (state, action: PayloadAction<AccountStateProps['company']>) => {
      state.company = action.payload
    },
    setTheme: (state, action: PayloadAction<AccountStateProps['theme']>) => {
      state.theme = action.payload
    },
    setSubscription: (state, action: PayloadAction<AccountStateProps['subscription']>) => {
      state.subscription = action.payload
    }
  }
})

export const { setManager, setCompany, setTheme, setSubscription } = accountSlice.actions
export default accountSlice.reducer