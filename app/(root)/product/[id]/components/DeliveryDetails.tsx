'use client';
import { motion } from 'framer-motion';
import { FaShippingFast, FaUndo, FaShieldAlt, FaHistory } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const DeliveryDetails = ({
  deliveryInfo,
}: {
  deliveryInfo: {
    delivery_time: string;
    delivery_charge: number;
    return_days: string;
    delivery_time_outside: string;
    delivery_charge_outside: number;
  };
}) => {
  const lang = useSelector((state: RootState) => state.language.language);

  const items = [
    {
      icon: <FaHistory />,
      title: lang === 'bn' ? 'ঢাকায় আনুমানিক ডেলিভারি' : 'Estimated Delivery in Dhaka',
      desc: `${lang === 'bn' ? 'পৌঁছাবে' : 'Arrives in'} ${deliveryInfo.delivery_time} ${
        lang === 'bn' ? 'কর্মদিবসের মধ্যে' : 'business days'
      }`,
    },
    {
      icon: <FaShippingFast />,
      title: lang === 'bn' ? 'ঢাকায় ডেলিভারি চার্জ' : 'Delivery Charge in Dhaka',
      desc: `${lang === 'bn' ? 'চার্জ' : 'Charge'} ৳${deliveryInfo.delivery_charge}`,
    },
    {
      icon: <FaHistory />,
      title: lang === 'bn' ? 'ঢাকার বাইরে আনুমানিক ডেলিভারি' : 'Estimated Delivery Outside Dhaka',
      desc: `${lang === 'bn' ? 'পৌঁছাবে' : 'Arrives in'} ${
        deliveryInfo.delivery_time_outside
      } ${lang === 'bn' ? 'কর্মদিবসের মধ্যে' : 'business days'}`,
    },
    {
      icon: <FaShippingFast />,
      title: lang === 'bn' ? 'ঢাকার বাইরে ডেলিভারি চার্জ' : 'Delivery Charge Outside Dhaka',
      desc: `${lang === 'bn' ? 'চার্জ' : 'Charge'} ৳${deliveryInfo.delivery_charge_outside}`,
    },
    {
      icon: <FaUndo />,
      title: lang === 'bn' ? 'রিটার্ন নীতি' : 'Return Policy',
      desc: `${lang === 'bn' ? 'ফ্রি রিটার্ন' : 'Free returns within'} ${
        deliveryInfo.return_days
      } ${lang === 'bn' ? 'দিনের মধ্যে' : 'days'}`,
    },
    {
      icon: <FaShieldAlt />,
      title: lang === 'bn' ? 'নিরাপদ ডেলিভারি' : 'Secure Delivery',
      desc:
        lang === 'bn' ? 'বিশ্বস্ত কুরিয়ার দ্বারা পরিচালিত' : 'Handled by trusted courier partners',
    },
  ];

  return (
    <section className="relative w-full rounded-l-3xl rounded-r-3xl border-[2px] border-primaryBlue bg-gradient-to-b from-[#f9fbff] via-[#f2f6ff] to-[#e8f0ff] p-4 shadow-[inset_0_0_15px_rgba(0,0,0,0.05)] xl:rounded-r-none">
      {/* Decorative gradient blobs */}
      <div className="left-[-60px] top-[-60px] hidden h-52 w-52 rounded-full bg-primaryBlue/20 blur-3xl md:absolute" />
      <div className="bottom-[-80px] right-[-80px] hidden h-64 w-64 rounded-full bg-primaryDarkBlue/10 blur-3xl md:absolute" />

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-6 text-center text-2xl font-bold text-primaryDarkBlue drop-shadow-sm"
      >
        {lang === 'bn' ? 'ডেলিভারি বিবরণ' : 'Delivery Details'}
      </motion.h2>

      <div className="relative z-10 flex flex-col gap-5  md:grid grid-cols-3 xl:grid-cols-none">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group flex items-start gap-4  rounded-2xl border border-transparent bg-white/80 p-3 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-primaryBlue hover:bg-gradient-to-br hover:from-white hover:to-blue-50 hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primaryBlue to-sky-500 text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-300/40">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-primaryDarkBlue group-hover:text-primaryBlue">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-gray-600 group-hover:text-gray-700">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DeliveryDetails;
