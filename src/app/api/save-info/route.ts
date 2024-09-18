import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const POST = auth(async (req, res) => {
  const session =  req.auth

  console.log(session)

  const { manager, company, logoUrl, theme, subscription, paymentinfo } = await req.json()

  try {
    await prisma.company.create({
      data: {
        name: company.name,
        email: company.email,
        phone: company.phone,
        city: company.city,
        country: company.country,
        postalCode: company.postalCode,
        website: company.website,
        logo: logoUrl,
        domain: company.domain,
        address: company.address,
      }
    })

    await prisma.user.update({
      where: {
        email: manager.email
      },
      data: {
        name: manager.name,
        emailVerified: new Date(),
        phone: manager.phone,
      }
    })


    await prisma.themeOptions.create({
      data: {
        mainColor: theme.mainColor,
        companyId: company.name,
      }
    })

    await prisma.subscriptionSelected.create({
      data: {
        type: subscription.type,
        monthlyPrice: subscription.type,
        yearlyPrice: subscription.type,
        features: subscription.features,
        companyId: company.name,
        managerId: manager.email,
      }
    })

    return NextResponse.json({ message: "Data saved" }, { status : 201 })
  } catch (error: any) {
    return NextResponse.json({ message: "Error saving data", error: error.message }, { status: 500 })
  }

})