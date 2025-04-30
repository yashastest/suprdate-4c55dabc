
import React from 'react';
import { AppHeader } from '@/components/AppHeader';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader title="Privacy Policy" showBackButton={true} />
      
      <div className="flex-1 p-5 pb-20 overflow-y-auto">
        <h1 className="font-poppins font-extrabold text-2xl mb-6 text-center gradient-text">Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="font-poppins font-bold text-lg mb-2">1. Introduction 🔒</h2>
            <p className="text-muted-foreground">
              At SuprDate, we take your privacy very seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our dating application.
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="font-poppins font-bold text-lg mb-2">2. Information We Collect 📱</h2>
            <p className="text-muted-foreground mb-3">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Create an account</li>
              <li>Complete your profile</li>
              <li>Upload photos</li>
              <li>Connect social media accounts</li>
              <li>Participate in surveys or promotions</li>
              <li>Contact our customer support</li>
            </ul>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="font-poppins font-bold text-lg mb-2">3. How We Use Your Information 🛠️</h2>
            <p className="text-muted-foreground mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Provide and improve our services</li>
              <li>Match you with potential dates</li>
              <li>Personalize your experience</li>
              <li>Process payments</li>
              <li>Communicate with you</li>
              <li>Monitor and analyze usage patterns</li>
            </ul>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="font-poppins font-bold text-lg mb-2">4. Data Security 🔐</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal data 
              against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="font-poppins font-bold text-lg mb-2">5. Contact Us 📧</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@suprdate.com" className="text-primary hover:underline">
                privacy@suprdate.com
              </a>
            </p>
          </section>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Last updated: April 30, 2025
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default PrivacyPolicy;
