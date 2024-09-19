import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export const POST = auth(async (req, res) => {
  const session = req.auth

  console.log(session)

  const { manager, company, logoUrl, theme, subscription, paymentinfo } = await req.json()

  try {
    const cpn = await prisma.company.create({
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
        monthlyPrice: subscription.monthlyPrice,
        yearlyPrice: subscription.yearlyPrice,
        features: subscription.features,
        companyId: cpn.id,
        managerId: manager.email,
      }
    })

    await prisma.paymentInfo.create({
      data: {
        collectionId: paymentinfo.collectionId,
        collectionStatus: paymentinfo.collectionStatus,
        paymentId: paymentinfo.paymentId,
        status: paymentinfo.status,
        externalReference: paymentinfo.externalReference,
        paymentType: paymentinfo.paymentType,
        merchantOrderId: paymentinfo.merchantOrderId,
        preferenceId: paymentinfo.preferenceId,
        siteId: paymentinfo.siteId,
        processingMode: paymentinfo.processingMode,
        merchantAccountId: paymentinfo.merchantAccountId,
        companyId: cpn.id,
      }
    })

    return NextResponse.json({ message: "Data saved" }, { status: 201 })
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ message: 'Compañía ya registrada', error: error.message }, { status: 400 })
      }
      return NextResponse.json({ message: 'Compañía ya registrada', error: error.message }, { status: 400 })
    }
    return NextResponse.json({ message: "Error saving data", error: error.message }, { status: 500 })
  }

})