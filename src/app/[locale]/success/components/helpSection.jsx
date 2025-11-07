'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const HelpSection = () => {
  const t = useTranslations('home');

  return (
    <section className="relative bg-white py-16 md:py-20 overflow-hidden">
      {/* Background Chart Image */}
      <div className="absolute inset-0 top-12 z-0 opacity-30">
        <Image
          src="/bg-help.svg"
          alt="Decorative chart background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto bg-[#f9f1e8] rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative">
          {/* Text Content */}
          <div>
            <h3 className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-[#956D42] mb-3">
              {t('confirmationThankYou.help.heading')}
            </h3>
            <p className="text-sm text-[#956D42] mb-3 leading-relaxed">
               {t('confirmationThankYou.help.phone')}{' '}
              <a
                href={`mailto:${t('email')}`}
                className="font-medium underline hover:text-[#b68756]"
                dir="ltr"
                style={{ unicodeBidi: 'plaintext' }}
              >
                {t('confirmationThankYou.help.email')}
              </a>.
            </p>

            <p className="text-sm text-[#956D42] mb-3 leading-relaxed">
              {t('confirmationThankYou.help.seeYou')}{' '}
            </p>
            <p className="text-sm text-[#956D42] mb-3 leading-relaxed">
              {t('confirmationThankYou.help.team')}{' '}
            </p>
          </div>

          {/* Icon */}
          <div className="absolute -top-6 ltr:right-6 rtl:left-6 w-[70px] h-[70px]">
            <Image
              src="/help.svg"
              alt="Help icon"
              fill
              className="object-contain"
              sizes="70px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
