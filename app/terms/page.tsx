"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
  const sections = [
    { id: "section1", title: "1. INTRODUCTION AND ACCEPTANCE" },
    { id: "section2", title: "2. DEFINITIONS" },
    { id: "section3", title: "3. ELIGIBILITY AND ACCOUNT REGISTRATION" },
    { id: "section4", title: "4. DESCRIPTION OF SERVICES" },
    { id: "section5", title: "5. USER OBLIGATIONS AND CONDUCT" },
    { id: "section6", title: "6. INTELLECTUAL PROPERTY RIGHTS" },
    { id: "section7", title: "7. FINANCIAL SERVICES TERMS" },
    { id: "section8", title: "8. PRIVACY AND DATA PROTECTION" },
    { id: "section9", title: "9. CONSENT MANAGEMENT" },
    { id: "section10", title: "10. SENSITIVE PERSONAL DATA" },
    { id: "section11", title: "11. CHILDREN'S DATA" },
    { id: "section12", title: "12. AUTOMATED DECISION-MAKING AND PROFILING" },
    { id: "section13", title: "13. DATA SECURITY" },
    { id: "section14", title: "14. DATA BREACH NOTIFICATION" },
    { id: "section15", title: "15. DATA SHARING AND THIRD PARTIES" },
    { id: "section16", title: "16. CROSS-BORDER DATA TRANSFERS" },
    { id: "section17", title: "17. DATA RETENTION" },
    { id: "section18", title: "18. COOKIES AND TRACKING TECHNOLOGIES" },
    { id: "section19", title: "19. MARKETING COMMUNICATIONS" },
    { id: "section20", title: "20. FEES, PAYMENTS, AND TRANSACTIONS" },
    { id: "section21", title: "21. DISCLAIMERS AND LIMITATION OF LIABILITY" },
    { id: "section22", title: "22. INDEMNIFICATION" },
    { id: "section23", title: "23. AMENDMENTS TO THESE TERMS" },
    { id: "section24", title: "24. SUSPENSION AND TERMINATION" },
    { id: "section25", title: "25. GOVERNING LAW AND DISPUTE RESOLUTION" },
    { id: "section26", title: "26. DATA PROTECTION IMPACT ASSESSMENTS (DPIAs)" },
    { id: "section27", title: "27. GOVERNANCE AND COMPLIANCE" },
    { id: "section28", title: "28. REGULATORY AUTHORITY" },
    { id: "section29", title: "29. OFFENCES AND PENALTIES" },
    { id: "section30", title: "30. CONTACT INFORMATION" },
    { id: "appendix-a", title: "APPENDIX A: DATA RETENTION SCHEDULE" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF6B35] font-medium text-sm mb-8 group transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#FF6B35]/10 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img src="/nthoppa-logo.png" alt="Nthoppa" className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-500">
            Nthoppa (Pty) Ltd | info@nthoppa.com | +267 75 736 600
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Governing Law: Republic of Botswana | Issued pursuant to: Botswana Data Protection Act No. 18 of 2024 | Effective Date: 2026
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm text-gray-600 hover:text-[#FF6B35] transition-colors"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
          {/* Section 1: INTRODUCTION AND ACCEPTANCE */}
          <section id="section1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. INTRODUCTION AND ACCEPTANCE</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>1.1</strong> These Terms and Conditions ("Terms") govern your access to and use of the Nthoppa platform, mobile application, website, and related services (collectively, the "Services") provided by Nthoppa (Pty) Ltd ("Nthoppa", "we", "our", or "us"), a company duly registered under the laws of the Republic of Botswana.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>1.2</strong> By accessing or using any part of the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, including any additional terms and conditions and policies referenced herein.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>1.3</strong> These Terms are issued in compliance with the Botswana Data Protection Act No. 18 of 2024 ("the Act"), the Botswana Consumer Protection Act, and all other applicable laws and regulations of the Republic of Botswana.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>1.4</strong> If you do not agree to these Terms, you must not access or use the Services. Certain features of the Services may be subject to additional guidelines, terms, or rules, which will be posted on the Platform in connection with such features. All such additional terms are incorporated by reference into these Terms.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>1.5</strong> These Terms may be available in languages other than English. In the event of any conflict or inconsistency between the English version and any translated version, the English version shall prevail.
            </p>
          </section>

          {/* Section 2: DEFINITIONS */}
          <section id="section2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. DEFINITIONS</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">Term</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">Definition</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Account</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">A registered user account on the Nthoppa Platform.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Biometric Data</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Facial recognition, fingerprint, or other biological identifiers used for authentication.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Child</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">A natural person under 16 years of age under the Data Protection Act.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Company/Nthoppa</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Nthoppa (Pty) Ltd, registration number [to be inserted], having its principal place of business in Gaborone, Botswana.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Consent</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Any freely given, specific, informed and unambiguous indication of your wishes by which you signify agreement to the processing of personal data relating to you.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Data Protection Commission</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">The Information and Data Protection Commission of Botswana.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Data Protection Officer (DPO)</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">The person appointed by Nthoppa to oversee data protection compliance, contactable at info@nthoppa.com.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">DPA</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">The Botswana Data Protection Act No. 18 of 2024, and all regulations and subsidiary legislation made thereunder.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Intellectual Property</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">All patents, trademarks, service marks, logos, trade names, domain names, copyrights, database rights, trade secrets, and any other proprietary rights.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Nthoppa Coin</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">The platform's reward points system that can be earned and redeemed for certain benefits.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Personal Data</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Any information relating to an identified or identifiable natural person as defined in the Act.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Platform(s)</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">The Nthoppa mobile application, website, and any associated digital services.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Processing</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Any operation performed on personal data, including collection, storage, use, disclosure, erasure, or destruction.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Sensitive Personal Data</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data, health data, or sex life.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Services</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">All financial education, insurance, savings, transaction, and related services provided through the Platform.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">Terms</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">These Terms and Conditions, as amended from time to time.</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900">User</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Any individual or entity accessing or using the Services, including agents, clients, HR managers, and merchants.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: ELIGIBILITY AND ACCOUNT REGISTRATION */}
          <section id="section3">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. ELIGIBILITY AND ACCOUNT REGISTRATION</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>3.1 Eligibility Requirements</strong> — To register for an Account, you must: (a) be at least 18 years of age; (b) have full legal capacity to enter into a binding agreement; (c) provide accurate, current, and complete registration information; and (d) comply with all applicable laws and regulations of Botswana.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>3.2 Account Registration</strong> — You may register for an Account through the Platform by providing the required information, including your full name, email address, phone number, and any other information we may reasonably require.</p>
            <p className="text-gray-600 leading-relaxed mb-2"><strong>3.3 One Account Per Person</strong> — You may not register for more than one Account. You are responsible for maintaining the confidentiality of your Account credentials and for all activities that occur under your Account.</p>
          </section>

          {/* Section 4: DESCRIPTION OF SERVICES */}
          <section id="section4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. DESCRIPTION OF SERVICES</h2>
            <p className="text-gray-600 leading-relaxed mb-3">Nthoppa provides a comprehensive digital financial ecosystem that includes:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li>Financial education courses and literacy tools</li>
              <li>Motshelo (community savings group) management</li>
              <li>Insurance product distribution (NthoppaSure)</li>
              <li>Credit scoring and financial health assessments</li>
              <li>Savings goal tracking and gamification (Nthoppa Coins)</li>
              <li>Transaction processing and payment facilitation</li>
              <li>Marketplace access to partner financial products</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>4.1</strong> We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, with reasonable notice where required by law.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>4.2</strong> We do not guarantee that the Services will be available at all times. We may perform maintenance or updates that temporarily affect availability.</p>
            <p className="text-gray-600 leading-relaxed"><strong>4.3</strong> We are not a bank or licensed financial advisor unless expressly stated. Financial products are provided through our partner institutions.</p>
          </section>

          {/* Section 5: USER OBLIGATIONS AND CONDUCT */}
          <section id="section5">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. USER OBLIGATIONS AND CONDUCT</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>5.1 Permitted Use</strong> — You agree to use the Services only for lawful purposes and in accordance with these Terms. You must not:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li>Use the Services in any way that violates any applicable law or regulation</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
              <li>Engage in fraudulent, deceptive, or harmful activities</li>
              <li>Attempt to gain unauthorised access to any part of the Platform</li>
              <li>Transmit any viruses, malware, or other harmful code</li>
              <li>Interfere with or disrupt the integrity or performance of the Services</li>
              <li>Collect or harvest any personally identifiable information from the Platform</li>
              <li>Use the Platform to send unsolicited marketing communications</li>
              <li>Reverse engineer, decompile, or disassemble any portion of the Platform</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>5.2 User Representations and Warranties</strong> — You represent and warrant that: (a) all information you provide is accurate and complete; (b) you will update your information as necessary; (c) you are solely responsible for your interactions with other Users; and (d) you will comply with all applicable laws.</p>
            <p className="text-gray-600 leading-relaxed"><strong>5.3 Reporting Violations</strong> — If you become aware of any violation of these Terms, you must immediately report it to info@nthoppa.com.</p>
          </section>

          {/* Section 6: INTELLECTUAL PROPERTY RIGHTS */}
          <section id="section6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. INTELLECTUAL PROPERTY RIGHTS</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>6.1</strong> All Intellectual Property rights in and to the Platform and Services are owned by Nthoppa or its licensors.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>6.2</strong> We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your personal or internal business purposes.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>6.3</strong> You may not copy, modify, distribute, sell, or lease any part of the Services without our prior written consent.</p>
            <p className="text-gray-600 leading-relaxed"><strong>6.4</strong> The Nthoppa name, logo, and all related names, logos, product and service names, designs, and slogans are our trademarks. You may not use such marks without our prior written permission.</p>
          </section>

          {/* Section 7: FINANCIAL SERVICES TERMS */}
          <section id="section7">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. FINANCIAL SERVICES TERMS</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>7.1</strong> Insurance products offered through NthoppaSure are underwritten by licensed insurance partners. Coverage, terms, and conditions are subject to the policy documents provided by the underwriter.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>7.2</strong> Premiums and coverage amounts are estimates until a formal policy is issued. We do not guarantee approval of any insurance application.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>7.3</strong> Motshelo groups are user-managed savings circles. Nthoppa provides administrative tools but does not guarantee returns or assume liability for group management.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>7.4</strong> Nthoppa Coins are reward points with no monetary value. They cannot be exchanged for cash and may expire as specified on the Platform.</p>
            <p className="text-gray-600 leading-relaxed"><strong>7.5</strong> Transactions processed through the Platform are subject to verification and may be reversed in cases of fraud or error.</p>
          </section>

          {/* Section 8: PRIVACY AND DATA PROTECTION */}
          <section id="section8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. PRIVACY AND DATA PROTECTION</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>8.1</strong> We process Personal Data in accordance with our Privacy Policy and the Data Protection Act.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>8.2</strong> Categories of Personal Data we collect include:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li>Identity data (name, ID number, date of birth, gender)</li>
              <li>Contact data (email address, phone number, physical address)</li>
              <li>Financial data (income, transaction history, savings behaviour)</li>
              <li>Technical data (device identifiers, IP address, usage statistics)</li>
              <li>Biometric data (for authentication, where applicable)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>8.3</strong> We process your Personal Data on lawful bases including consent, contract performance, legal obligations, and legitimate interests.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>8.4</strong> We implement appropriate technical and organisational measures to protect your Personal Data.</p>
            <p className="text-gray-600 leading-relaxed"><strong>8.5</strong> You have rights under the Act including access, rectification, erasure, restriction, portability, and objection. Response time: 30 calendar days, extendable by 60 days for complex requests.</p>
          </section>

          {/* Section 9: CONSENT MANAGEMENT */}
          <section id="section9">
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. CONSENT MANAGEMENT</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>9.1</strong> We obtain your Consent before processing your Personal Data where required by law.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>9.2</strong> Consent for Sensitive Personal Data is always obtained separately and is never bundled with general terms of service.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>9.3</strong> You may withdraw your Consent at any time through Platform settings or by contacting our Data Protection Officer.</p>
            <p className="text-gray-600 leading-relaxed"><strong>9.4</strong> Withdrawal of Consent does not affect the lawfulness of processing based on Consent before its withdrawal.</p>
          </section>

          {/* Section 10: SENSITIVE PERSONAL DATA */}
          <section id="section10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. SENSITIVE PERSONAL DATA</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>10.1</strong> We collect and process the following Sensitive Personal Data where necessary:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li>National ID and passport numbers (for identity verification)</li>
              <li>Financial vulnerability data (debt profiles, savings behaviour)</li>
              <li>Biometric data (fingerprint or facial recognition for authentication)</li>
              <li>Health data (for insurance products where applicable)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>10.2</strong> We process Sensitive Personal Data only on lawful bases, including your explicit Consent, contractual necessity, or legal obligation.</p>
            <p className="text-gray-600 leading-relaxed"><strong>10.3</strong> We apply enhanced technical and organisational safeguards to Sensitive Personal Data, including encryption and strict access controls.</p>
          </section>

          {/* Section 11: CHILDREN'S DATA */}
          <section id="section11">
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. CHILDREN'S DATA</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>11.1</strong> Our Services are intended for persons 18 years or older. We do not knowingly collect data from children under 16 without verifiable parental consent.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>11.2</strong> Persons aged 16-17 may register only with parental or guardian consent obtained prior to registration.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>11.3</strong> If we discover we have collected data from a child under 16 without valid parental consent, we will delete that data promptly.</p>
            <p className="text-gray-600 leading-relaxed"><strong>11.4</strong> To report a child data issue, contact our Data Protection Officer at info@nthoppa.com.</p>
          </section>

          {/* Section 12: AUTOMATED DECISION-MAKING AND PROFILING */}
          <section id="section12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">12. AUTOMATED DECISION-MAKING AND PROFILING</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>12.1</strong> We use automated processing and profiling to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li>Personalise financial content and recommendations</li>
              <li>Calculate Nthoppa Coin rewards and gamification scores</li>
              <li>Assess indicative insurance eligibility</li>
              <li>Detect unusual account activity or potential fraud</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>12.2</strong> You have the right not to be subject to decisions based solely on automated processing that produce significant effects.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>12.3</strong> Where an automated decision affects you significantly, you may request human review and contest the decision.</p>
            <p className="text-gray-600 leading-relaxed"><strong>12.4</strong> Final decisions affecting insurance eligibility, account suspension, or financial product access are subject to human oversight.</p>
          </section>

          {/* Section 13: DATA SECURITY */}
          <section id="section13">
            <h2 className="text-xl font-bold text-gray-900 mb-4">13. DATA SECURITY</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>13.1</strong> We implement technical and organisational measures including:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li>Encryption of sensitive information at rest and in transit</li>
              <li>Multi-factor authentication and role-based access controls</li>
              <li>Continuous monitoring, intrusion detection, and penetration testing</li>
              <li>Staff training on data protection obligations</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>13.2</strong> Despite our safeguards, no method of transmission over the internet is completely secure.</p>
            <p className="text-gray-600 leading-relaxed"><strong>13.3</strong> You are responsible for maintaining the security of your Account credentials and must notify us immediately of any unauthorised access.</p>
          </section>

          {/* Section 14: DATA BREACH NOTIFICATION */}
          <section id="section14">
            <h2 className="text-xl font-bold text-gray-900 mb-4">14. DATA BREACH NOTIFICATION</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>14.1</strong> In the event of a Personal Data breach, we will notify the Data Protection Commission within 72 hours where legally required.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>14.2</strong> Affected individuals will be notified without undue delay where the breach is likely to result in a high risk to their rights.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>14.3</strong> Notification will include the nature of the breach, categories affected, likely consequences, and measures taken or proposed.</p>
            <p className="text-gray-600 leading-relaxed"><strong>14.4</strong> All breaches are logged internally and reviewed by our Data Protection Officer.</p>
          </section>

          {/* Section 15: DATA SHARING AND THIRD PARTIES */}
          <section id="section15">
            <h2 className="text-xl font-bold text-gray-900 mb-4">15. DATA SHARING AND THIRD PARTIES</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>15.1</strong> We may share Personal Data with the following categories of recipients:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li>Insurance underwriters and distribution partners</li>
              <li>Payment processors and financial institutions</li>
              <li>Technology and cloud service providers</li>
              <li>Regulatory or law enforcement authorities as required by law</li>
              <li>Professional advisers (legal counsel, auditors)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>15.2</strong> All third parties are subject to contractual obligations to protect Personal Data.</p>
            <p className="text-gray-600 leading-relaxed"><strong>15.3</strong> We do not sell Personal Data to any third party.</p>
          </section>

          {/* Section 16: CROSS-BORDER DATA TRANSFERS */}
          <section id="section16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">16. CROSS-BORDER DATA TRANSFERS</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>16.1</strong> We may transfer Personal Data outside the Republic of Botswana where appropriate safeguards are in place, including:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li>Adequacy determinations by the Data Protection Commission</li>
              <li>Standard contractual clauses approved by the Commission</li>
              <li>Binding corporate rules</li>
              <li>Your explicit Consent after being informed of risks</li>
            </ul>
            <p className="text-gray-600 leading-relaxed"><strong>16.2</strong> Data transfers are documented in our internal transfer register maintained by our Data Protection Officer.</p>
          </section>

          {/* Section 17: DATA RETENTION */}
          <section id="section17">
            <h2 className="text-xl font-bold text-gray-900 mb-4">17. DATA RETENTION</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>17.1</strong> We retain Personal Data only as long as necessary for the purposes for which it was collected.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>17.2</strong> Standard retention periods: User account data: duration of account plus 12 months; Financial records: up to 7 years; Identity verification records: 5-7 years; Marketing consent records: 3 years.</p>
            <p className="text-gray-600 leading-relaxed"><strong>17.3</strong> For complete retention schedules, see Appendix A.</p>
          </section>

          {/* Section 18: COOKIES AND TRACKING TECHNOLOGIES */}
          <section id="section18">
            <h2 className="text-xl font-bold text-gray-900 mb-4">18. COOKIES AND TRACKING TECHNOLOGIES</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>18.1</strong> We use cookies and similar tracking technologies. Categories include:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li><strong>Essential Cookies:</strong> Required for core functionality (authentication, security). Cannot be disabled.</li>
              <li><strong>Functional Cookies:</strong> Enable enhanced features and personalisation.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform.</li>
              <li><strong>Third-Party Cookies:</strong> Set by analytics or service providers.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed"><strong>18.2</strong> Essential cookies are set without consent. For other cookies, we request consent on first use. You may withdraw consent through browser settings or our cookie preference centre.</p>
          </section>

          {/* Section 19: MARKETING COMMUNICATIONS */}
          <section id="section19">
            <h2 className="text-xl font-bold text-gray-900 mb-4">19. MARKETING COMMUNICATIONS</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>19.1</strong> We will only send marketing communications where you have provided explicit Consent or as permitted by law.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>19.2</strong> You may opt out of marketing at any time using in-app settings, the unsubscribe link in emails, or by contacting our Data Protection Officer.</p>
            <p className="text-gray-600 leading-relaxed"><strong>19.3</strong> Opting out does not affect essential service communications (transaction confirmations, security alerts).</p>
          </section>

          {/* Section 20: FEES, PAYMENTS, AND TRANSACTIONS */}
          <section id="section20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">20. FEES, PAYMENTS, AND TRANSACTIONS</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>20.1</strong> Certain Services may require payment of fees. Fees are displayed on the Platform and are subject to change with reasonable notice.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>20.2</strong> All payments are processed through authorised payment service providers. We do not store full payment card information.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>20.3</strong> You are responsible for all fees associated with your use of the Services.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>20.4</strong> Fees are non-refundable except as required by law or expressly stated on the Platform.</p>
            <p className="text-gray-600 leading-relaxed"><strong>20.5</strong> We may impose transaction limits or require verification for certain transactions.</p>
          </section>

          {/* Section 21: DISCLAIMERS AND LIMITATION OF LIABILITY */}
          <section id="section21">
            <h2 className="text-xl font-bold text-gray-900 mb-4">21. DISCLAIMERS AND LIMITATION OF LIABILITY</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>21.1 As-Is Basis</strong> — The Services are provided "as is" and "as available" without warranties of any kind, either express or implied.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>21.2 Service Availability</strong> — We do not warrant that the Services will be uninterrupted, error-free, or secure.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>21.3 Limitation of Liability</strong> — To the fullest extent permitted by law, our total liability to you for any claims arising out of or relating to these Terms or the Services shall not exceed the greater of: (a) BWP 1,000.00, or (b) the amount you paid us in the preceding three months.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>21.4 Excluded Loss</strong> — We are not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>21.5 No Financial Advice Liability</strong> — We do not provide financial advice. Any tools or recommendations are for informational purposes only.</p>
            <p className="text-gray-600 leading-relaxed"><strong>21.6 Third-Party Platforms</strong> — We are not responsible for the content or practices of any third-party websites or services linked from our Platform.</p>
          </section>

          {/* Section 22: INDEMNIFICATION */}
          <section id="section22">
            <h2 className="text-xl font-bold text-gray-900 mb-4">22. INDEMNIFICATION</h2>
            <p className="text-gray-600 leading-relaxed">You agree to indemnify, defend, and hold harmless Nthoppa and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or relating to: (a) your violation of these Terms; (b) your use of the Services; (c) your violation of any applicable law; or (d) your violation of any third-party rights.</p>
          </section>

          {/* Section 23: AMENDMENTS TO THESE TERMS */}
          <section id="section23">
            <h2 className="text-xl font-bold text-gray-900 mb-4">23. AMENDMENTS TO THESE TERMS</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>23.1</strong> We may amend these Terms from time to time. We will provide at least 14 days advance notice of material changes.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>23.2</strong> Notice will be provided via email or through the Platform.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>23.3</strong> If you continue to use the Services after the effective date of changes, you are deemed to have accepted the amended Terms.</p>
            <p className="text-gray-600 leading-relaxed"><strong>23.4</strong> If you do not agree to the amended Terms, you must cease using the Services.</p>
          </section>

          {/* Section 24: SUSPENSION AND TERMINATION */}
          <section id="section24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">24. SUSPENSION AND TERMINATION</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>24.1</strong> We may suspend or terminate your Account if you breach these Terms or engage in conduct that harms our Platform or other Users.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>24.2</strong> You may terminate your Account at any time by contacting our support team.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>24.3</strong> Upon termination, we will delete or anonymise your Personal Data in accordance with our retention policies.</p>
            <p className="text-gray-600 leading-relaxed"><strong>24.4</strong> Sections that by their nature should survive termination shall survive, including Intellectual Property, Limitation of Liability, and Indemnification.</p>
          </section>

          {/* Section 25: GOVERNING LAW AND DISPUTE RESOLUTION */}
          <section id="section25">
            <h2 className="text-xl font-bold text-gray-900 mb-4">25. GOVERNING LAW AND DISPUTE RESOLUTION</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>25.1</strong> These Terms are governed by and construed in accordance with the laws of the Republic of Botswana.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>25.2</strong> Any dispute arising out of or relating to these Terms shall first be attempted to be resolved through good-faith negotiations.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>25.3</strong> If the dispute cannot be resolved within 30 days, either party may submit the dispute to binding arbitration in Gaborone, Botswana, in accordance with the Arbitration Act of Botswana.</p>
            <p className="text-gray-600 leading-relaxed"><strong>25.4</strong> Nothing in this section prevents either party from seeking injunctive relief in the courts of Botswana.</p>
          </section>

          {/* Section 26: DATA PROTECTION IMPACT ASSESSMENTS (DPIAs) */}
          <section id="section26">
            <h2 className="text-xl font-bold text-gray-900 mb-4">26. DATA PROTECTION IMPACT ASSESSMENTS (DPIAs)</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>26.1</strong> We conduct DPIAs before commencing any processing activity likely to result in a high risk to your rights and freedoms.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>26.2</strong> Activities triggering a DPIA include:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li>Processing national ID numbers or biometric data at scale</li>
              <li>Using automated systems for insurance eligibility assessment</li>
              <li>Introducing new processing technologies</li>
              <li>Large-scale processing of Sensitive Personal Data</li>
            </ul>
            <p className="text-gray-600 leading-relaxed"><strong>26.3</strong> Where a DPIA indicates a high risk that cannot be mitigated, we consult the Data Protection Commission before processing.</p>
          </section>

          {/* Section 27: GOVERNANCE AND COMPLIANCE */}
          <section id="section27">
            <h2 className="text-xl font-bold text-gray-900 mb-4">27. GOVERNANCE AND COMPLIANCE</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>27.1</strong> Our Data Protection Officer oversees compliance with these Terms and the Act.</p>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>27.2</strong> Data Protection Officer contact details:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-3">
              <li>Role: Data Protection Officer (DPO)</li>
              <li>Organisation: Nthoppa (Pty) Ltd</li>
              <li>Email: info@nthoppa.com</li>
              <li>Phone: +267 75 736 600</li>
              <li>IDPC Registration: Registered with the Information and Data Protection Commission</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>27.3</strong> We maintain records of processing activities and data transfer registers as required by law.</p>
            <p className="text-gray-600 leading-relaxed"><strong>27.4</strong> We cooperate fully with the Data Protection Commission in the performance of its duties.</p>
          </section>

          {/* Section 28: REGULATORY AUTHORITY */}
          <section id="section28">
            <h2 className="text-xl font-bold text-gray-900 mb-4">28. REGULATORY AUTHORITY</h2>
            <p className="text-gray-600 leading-relaxed mb-3"><strong>Information and Data Protection Commission (IDPC)</strong></p>
            <p className="text-gray-600 leading-relaxed">Website: <a href="https://www.idpc.org.bw" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">www.idpc.org.bw</a></p>
            <p className="text-gray-600 leading-relaxed">Physical address: Information and Data Protection Commission, Gaborone, Botswana</p>
          </section>

          {/* Section 29: OFFENCES AND PENALTIES */}
          <section id="section29">
            <h2 className="text-xl font-bold text-gray-900 mb-4">29. OFFENCES AND PENALTIES</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">Offence</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">Maximum Penalty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Processing Personal Data without lawful basis</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">BWP 10 million or 2% of global turnover</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Failure to notify a data breach</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">BWP 10 million or 2% of global turnover</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Failure to comply with data subject rights</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">BWP 5 million or 1% of global turnover</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Transferring data outside Botswana without safeguards</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">BWP 20 million or 4% of global turnover</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Processing Sensitive Personal Data without Consent</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">BWP 20 million or 4% of global turnover</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Failure to appoint a Data Protection Officer when required</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">BWP 5 million or 1% of global turnover</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Failure to conduct a mandatory DPIA</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">BWP 5 million or 1% of global turnover</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Obstructing the Data Protection Commission</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">BWP 1 million</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Knowingly providing false information in a data protection matter</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">BWP 1 million or imprisonment for 2 years, or both</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed mt-3">Note: Administrative penalties may be up to BWP 50 million or 4% of global annual turnover, whichever is higher, for serious violations under Section 99 of the Act.</p>
          </section>

          {/* Section 30: CONTACT INFORMATION */}
          <section id="section30">
            <h2 className="text-xl font-bold text-gray-900 mb-4">30. CONTACT INFORMATION</h2>
            <p className="text-gray-600 leading-relaxed mb-2"><strong>Organisation:</strong> Nthoppa (Pty) Ltd</p>
            <p className="text-gray-600 leading-relaxed mb-2"><strong>Email:</strong> <a href="mailto:info@nthoppa.com" className="text-[#FF6B35] hover:underline">info@nthoppa.com</a></p>
            <p className="text-gray-600 leading-relaxed mb-2"><strong>Phone:</strong> +267 75 736 600</p>
            <p className="text-gray-600 leading-relaxed mb-2"><strong>Website:</strong> <a href="https://nthoppa.com" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">www.nthoppa.com</a></p>
            <p className="text-gray-600 leading-relaxed mb-2"><strong>Data Protection Officer:</strong> info@nthoppa.com</p>
            <p className="text-gray-600 leading-relaxed"><strong>IDPC:</strong> www.idpc.org.bw | Information and Data Protection Commission, Gaborone, Botswana</p>
          </section>

          {/* APPENDIX A: DATA RETENTION SCHEDULE */}
          <section id="appendix-a">
            <h2 className="text-xl font-bold text-gray-900 mb-4">APPENDIX A: DATA RETENTION SCHEDULE</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">Data Category</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">Retention Period</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-900">Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">General User Account Data</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Duration of account + 12 months</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Legitimate interest / Contract</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Financial & Transaction Records</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">7 years</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Legal obligation</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Insurance Policy Records</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">7 years from policy expiry</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Legal obligation</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Identity Verification (ID/Passport)</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">5-7 years</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Legal obligation (AML/KYC)</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Marketing Consent Records</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">3 years from last consent or withdrawal</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Legal obligation / Consent</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Children's Data</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Deleted promptly upon request or when child turns 18</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Consent / Legal obligation</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Biometric Data</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Duration of account, or as required for authentication</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Consent / Security</td></tr>
                  <tr><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">DPIA & Compliance Records</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">5 years</td><td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">Legal obligation</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Nthoppa (Pty) Ltd | info@nthoppa.com | +267 75 736 600
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2026 Nthoppa Financial Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}