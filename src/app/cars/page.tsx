import MainLayout from '@/components/layout/MainLayout';
import VehicleListings from '@/components/vehicles/VehicleListings';

export const metadata = {
  title: 'Makina në Shitje | AutoAni',
  description: 'Shiko koleksionin tonë të makinave në shitje. Zgjedh nga markat më të njohura me çmime konkurruese.',
};

export default function CarsPage() {
  return (
    <MainLayout>
      <div className="pt-20 pb-16">
        <VehicleListings />
      </div>
    </MainLayout>
  );
}
