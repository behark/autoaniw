'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaExchangeAlt, FaMoneyBillWave, FaShieldAlt, FaCalculator } from 'react-icons/fa';

const ServicesFeatures = () => {
  const services = [
    {
      id: 1,
      title: 'Ndërro Veturën',
      description: 'Bleni një veturë të re nga inventari ynë duke paguar vetëm diferencën e vlerës midis veturës së re dhe veturës tuaj aktuale.',
      icon: <FaExchangeAlt className="h-10 w-10" />,
      cta: 'Na Kontakto',
      link: '/contact',
    },
    {
      id: 2,
      title: 'Lizing',
      description: 'Vetura me lizing nga bankat më të njohura në Kosovë. Mundësi e jashtëzakonshme për të blerë një veturë të re në një kohë më të shpejtë.',
      icon: <FaMoneyBillWave className="h-10 w-10" />,
      cta: 'Shiko Opcionet',
      link: '/financing',
    },
    {
      id: 3,
      title: 'Blej me Besim – Veturë me Garancion',
      description: 'Të gjitha automjetet tona vijnë me garancion të plotë pas shitjes. Auto Sherreti garanton cilësinë, sigurinë dhe besueshmërinë.',
      icon: <FaShieldAlt className="h-10 w-10" />,
      cta: 'Mëso më Shumë',
      link: '/about',
    },
    {
      id: 4,
      title: 'Kalkulator Financimi',
      description: 'Llogaritni lehtë këste mujore dhe shuma totale për financimin e veturës suaj të re me kalkulatorin tonë të thjeshtë online.',
      icon: <FaCalculator className="h-10 w-10" />,
      cta: 'Hap Kalkulatorin',
      link: '/financing#calculator',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gjeni makinën tuaj të ëndrrave në showroom-in tonë
          </h2>
          <p className="text-gray-600">
            Ne kemi një gamë të plotë automjetesh luksoze me çmime konkuruese, duke përfshirë oferta krejt të reja nga prodhuesit 
            e makinave të nivelit të lartë të zgjedhura me kujdes për të përmbushur nevojat dhe personalitetin e klientit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link
                href={service.link}
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                {service.cta} →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesFeatures;
