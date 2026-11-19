import Link from "next/link";
import { Container } from "@/components/common";
import { Text } from "@/components/feature";

export default function ContactProcurementSlot() {
  return (
    <section className='contactProcurement' aria-label='Supplier and procurement information'>
      <Container className='main'>
        <Text className='body'>
          <Link href='/public-sector/how-to-buy' className='textLink'>
            Supplier and procurement information
            <span aria-hidden='true'> →</span>
          </Link>
        </Text>
      </Container>
    </section>
  );
}
