import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";


interface CardConfigAcccountProps {
  title: string,
  description: string,
  children?: React.ReactNode,
  cardFooter: React.ReactNode | string,
  showBrand: boolean
}

const CardConfigAccount: React.FC<CardConfigAcccountProps> = ({ title, description, children, cardFooter, showBrand }) => {
  return (
    <Card className='max-w-3xl mx-auto my-auto'>
      <CardHeader>
        <div className={`flex flex-row gap-2 items-center mb-4 ${!showBrand && 'hidden'}`}>
          <Image src='/logo-2-teal.svg' alt='epyme logo' width={48} height={48} />
          <h2 className='text-2xl font-bold'>EPYME</h2>
        </div>
        <CardTitle className='text-xl'>{title}</CardTitle>
        <CardDescription className='text-base'>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        {cardFooter}
      </CardFooter>
    </Card>
  );
};

export default CardConfigAccount