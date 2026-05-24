"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "introduction", title: "1. INTRODUCTION" },
    { id: "personal-information", title: "2. PERSONAL INFORMATION WE COLLECT" },
    { id: "how-we-use", title: "3. HOW WE USE YOUR PERSONAL INFORMATION" },
    { id: "legal-basis", title: "4. LEGAL BASIS FOR PROCESSING" },
    { id: "sensitive-data", title: "5. SENSITIVE PERSONAL DATA" },
    { id: "consent", title: "6. CONSENT AND YOUR CHOICES" },
    { id: "childrens-data", title: "7. CHILDREN'S DATA" },
    { id: "automated-decisions", title: "8. AUTOMATED DECISION-MAKING AND PROFILING" },
    { id: "data-sharing", title: "9. DATA SHARING AND DISCLOSURE" },
    { id: "cross-border", title: "10. CROSS-BORDER DATA TRANSFERS" },
    { id: "dpia", title: "11. DATA PROTECTION IMPACT ASSESSMENTS (DPIAs)" },
    { id: "data-retention", title: "12. DATA RETENTION" },
    { id: "data-security", title: "13. DATA SECURITY" },
    { id: "breach-notification", title: "14. DATA BREACH NOTIFICATION" },
    { id: "your-rights", title: "15. YOUR RIGHTS" },
    { id: "marketing", title: "16. MARKETING COMMUNICATIONS" },
    { id: "cookies", title: "17. COOKIES AND ANALYTICS" },
    { id: "dpo", title: "18. DATA PROTECTION OFFICER" },
    { id: "governing-law", title: "19. GOVERNING LAW" },
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
            Privacy Policy
          </h1>
          <p className="text-gray-500">
            Nthoppa (Pty) Ltd | info@nthoppa.com | +267 75 736 600
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Issued in accordance with the Botswana Data Protection Act No. 18 of 2024
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
          {/* 1. INTRODUCTION */}
          <section id="introduction">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. INTRODUCTION</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nthoppa (Pty) Ltd ("Nthoppa", "we", "our", or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, share, and protect personal information when you access or use the Nthoppa mobile application, website, and related services (collectively, the "Services").
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              This Policy is issued in compliance with the Botswana Data Protection Act No. 18 of 2024 ("the Act") and applies to all users, customers, agents, partners, and visitors, whether interacting with us digitally or otherwise.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Where we provide links to third-party websites or services, this Privacy Policy does not apply to those third parties. We encourage you to review their privacy policies separately. By using our Services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>

          {/* 2. PERSONAL INFORMATION WE COLLECT */}
          <section id="personal-information">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. PERSONAL INFORMATION WE COLLECT</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect personal data that is necessary to provide our services effectively and lawfully. We only collect data that is adequate, relevant, and limited to what is necessary for the purposes set out in this Policy (data minimisation principle).
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">2.1 Information You Provide Directly</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
              <li>Full name, date of birth, gender</li>
              <li>National ID number or passport number (see Section 6 regarding sensitive data)</li>
              <li>Contact details (telephone number, email address)</li>
              <li>Account registration details and authentication credentials</li>
              <li>Insurance applications and declarations</li>
              <li>Financial literacy assessments, quizzes, and survey responses</li>
              <li>Communications with customer support, agents, or representatives</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">2.2 Financial and Transactional Information</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
              <li>Payment and transaction details (processed via authorised payment service providers)</li>
              <li>Insurance policy details, premiums, and coverage information</li>
              <li>Savings, budgeting, and debt management data</li>
              <li>Rewards, incentives, and gamification data (e.g. Nthoppa Coin)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">2.3 Technical and Usage Information</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
              <li>Device identifiers, IP address, operating system, and app version</li>
              <li>Log files, usage statistics, and interaction data</li>
              <li>Location data (including GPS) where required for verification, insurance, or regulatory purposes</li>
              <li>One-time password (OTP) and authentication logs</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">2.4 Information from Third Parties</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Insurance underwriters and distribution partners</li>
              <li>Payment processors and financial institutions</li>
              <li>Service providers supporting analytics, communications, compliance, or security</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-2">
              All third-party sources are verified to ensure they provide data lawfully. We do not receive more data from these sources than is necessary for the applicable purpose.
            </p>
          </section>

          {/* 3. HOW WE USE YOUR PERSONAL INFORMATION */}
          <section id="how-we-use">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. HOW WE USE YOUR PERSONAL INFORMATION</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We process personal data only for the following specified, explicit, and legitimate purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
              <li>To provide financial education, tools, and advisory services</li>
              <li>To issue, administer, and manage insurance products</li>
              <li>To process payments and transactions</li>
              <li>To verify identity and prevent fraud or unauthorised access</li>
              <li>To personalise content, insights, and recommendations (see also Section 10 on automated decision-making)</li>
              <li>To operate quizzes, rewards, and gamification features</li>
              <li>To communicate service updates, notices, and customer support responses</li>
              <li>To comply with legal, regulatory, and supervisory obligations</li>
              <li>To conduct Data Protection Impact Assessments and internal compliance reviews</li>
            </ul>
            <p className="text-gray-600 leading-relaxed font-semibold">
              Nthoppa does not sell personal data to any third party.
            </p>
          </section>

          {/* 4. LEGAL BASIS FOR PROCESSING */}
          <section id="legal-basis">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. LEGAL BASIS FOR PROCESSING</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We process personal data on one or more of the following lawful bases under Section 26 of the Act:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li><strong>Explicit consent</strong> - obtained freely, specifically, and unambiguously before processing begins</li>
              <li><strong>Performance of a contract</strong> - where processing is strictly necessary to deliver a requested service or fulfil a contractual obligation</li>
              <li><strong>Compliance with a legal or regulatory obligation</strong></li>
              <li><strong>Legitimate interests</strong> - where Nthoppa has a legitimate operational interest (such as platform security and fraud prevention), provided that interest does not override your fundamental rights and freedoms</li>
            </ul>
          </section>

          {/* 5. SENSITIVE PERSONAL DATA */}
          <section id="sensitive-data">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. SENSITIVE PERSONAL DATA</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Certain categories of personal data require heightened protection under Sections 30 and 31 of the Act. Nthoppa collects and processes the following categories of data that may attract this enhanced protection:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
              <li>National ID numbers and passport numbers - used for identity verification and regulatory compliance</li>
              <li>Financial vulnerability data - including debt profiles, savings behaviour, and insurance eligibility assessments</li>
              <li>Biometric data - only where it uniquely identifies a natural person, such as fingerprint or facial recognition used for authentication purposes</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              The legal bases for processing sensitive personal data include: your explicit consent, processing necessary for the performance of insurance contracts or provision of financial services as required by law, and compliance with legal obligations applicable to Nthoppa as a regulated financial services entity.
            </p>
          </section>

          {/* 6. CONSENT AND YOUR CHOICES */}
          <section id="consent">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. CONSENT AND YOUR CHOICES</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Consent is obtained at account registration or immediately prior to any specific processing activity for which it is the lawful basis</li>
              <li>Consent for sensitive data is always sought separately and is never bundled with general terms of service</li>
              <li>You may withdraw consent at any time through application settings or by contacting our Data Protection Officer</li>
              <li>Withdrawal of consent does not affect the lawfulness of processing carried out before withdrawal</li>
              <li>Where consent is withdrawn, we will cease the relevant processing as soon as reasonably practicable, except where another lawful basis applies</li>
            </ul>
          </section>

          {/* 7. CHILDREN'S DATA */}
          <section id="childrens-data">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. CHILDREN'S DATA</h2>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">7.1 Minimum Age Requirement</h3>
            <p className="text-gray-600 leading-relaxed mb-4">Our Services are intended for users who are 18 years of age or older. We do not knowingly provide Services directly to children under the age of 16 without verifiable parental or guardian consent.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">7.2 Users Aged 16 to 17</h3>
            <p className="text-gray-600 leading-relaxed mb-4">A person aged 16 or 17 may register for and use our Services, provided that parental or guardian consent is obtained prior to registration, in the manner prescribed by law. Both the child and the parent or guardian jointly acknowledge consent to the processing of the child's personal data. We use reasonable technical measures, proportionate to available technology, to verify the user's age and the identity of the consenting parent or guardian.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">7.3 Children Under 16</h3>
            <p className="text-gray-600 leading-relaxed mb-4">We do not knowingly collect or process the personal data of children under the age of 16 without verifiable consent from a parent or person with parental responsibility under the Children's Act of Botswana. If we discover that we have inadvertently collected personal data from a child under 16 without valid parental consent, we will delete that data promptly and notify the parent or guardian where possible.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">7.4 Reporting</h3>
            <p className="text-gray-600 leading-relaxed">If you believe a child under 16 has provided personal data to us without appropriate consent, please contact our Data Protection Officer immediately at info@nthoppa.com.</p>
          </section>

          {/* 8. AUTOMATED DECISION-MAKING AND PROFILING */}
          <section id="automated-decisions">
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. AUTOMATED DECISION-MAKING AND PROFILING</h2>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">8.1 How We Use Automated Processing</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
              <li>Personalising financial content, recommendations, and educational pathways based on your usage patterns and assessment results</li>
              <li>Calculating Nthoppa Coin rewards and gamification scores</li>
              <li>Assessing indicative insurance eligibility and premium estimates based on declared information</li>
              <li>Detecting unusual account activity or potential fraud</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">8.2 Your Rights Regarding Automated Decisions</h3>
            <p className="text-gray-600 leading-relaxed mb-4">Where any automated process produces a decision with a legal or significant effect on you, you have the right to: be informed that such a decision was made by automated means; request a human review of the automated decision; express your point of view and contest the decision. Final decisions affecting insurance eligibility, account suspension, or financial product access are subject to human oversight and are not made solely by automated systems.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">8.3 Profiling Safeguards</h3>
            <p className="text-gray-600 leading-relaxed">All profiling activities are carried out on the basis of lawful processing grounds. We implement appropriate safeguards to ensure profiling does not result in discrimination or violations of your fundamental rights. The logic used in our personalisation and assessment tools is reviewed periodically by our Data Protection Officer.</p>
          </section>

          {/* 9. DATA SHARING AND DISCLOSURE */}
          <section id="data-sharing">
            <h2 className="text-xl font-bold text-gray-900 mb-4">9. DATA SHARING AND DISCLOSURE</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may share personal data with the following categories of recipients, each subject to contractual obligations to protect personal data and process it only on documented instructions:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Insurance underwriters, brokers, and reinsurance partners - for policy administration and claims processing</li>
              <li>Payment processors and authorised financial institutions - for transaction processing and regulatory compliance</li>
              <li>Technology and cloud service providers acting as data processors - for hosting, analytics, and communications infrastructure</li>
              <li>Regulatory or law enforcement authorities - where required or permitted by applicable law</li>
              <li>Professional advisers - including legal counsel, auditors, and compliance consultants, under obligations of confidentiality</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">We do not share your data with third parties for their own marketing purposes. We do not sell personal data.</p>
          </section>

          {/* 10. CROSS-BORDER DATA TRANSFERS */}
          <section id="cross-border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">10. CROSS-BORDER DATA TRANSFERS</h2>
            <p className="text-gray-600 leading-relaxed">
              Where personal data is transferred outside the Republic of Botswana, Nthoppa ensures that appropriate safeguards are in place in accordance with Section 64 of the Act. Transfer mechanisms we may rely upon include: adequacy determinations, standard contractual clauses, binding corporate rules, or explicit consent where no other mechanism applies and you have been fully informed of the risks. We will inform you of the specific countries to which your data may be transferred upon request.
            </p>
          </section>

          {/* 11. DATA PROTECTION IMPACT ASSESSMENTS */}
          <section id="dpia">
            <h2 className="text-xl font-bold text-gray-900 mb-4">11. DATA PROTECTION IMPACT ASSESSMENTS (DPIAs)</h2>
            <p className="text-gray-600 leading-relaxed">
              In accordance with Section 58 of the Act, Nthoppa conducts Data Protection Impact Assessments before commencing any processing activity likely to result in a high risk to the rights and freedoms of individuals. Where a DPIA indicates that a processing activity would result in a high risk that cannot be mitigated by safeguards alone, we will consult the Information and Data Protection Commission before commencing that processing.
            </p>
          </section>

          {/* 12. DATA RETENTION */}
          <section id="data-retention">
            <h2 className="text-xl font-bold text-gray-900 mb-4">12. DATA RETENTION</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain personal data only for as long as necessary to fulfil the operational, contractual, or legal purpose for which it was collected. General user account data is retained for the duration of the account relationship, plus 12 months following account closure. Financial and insurance records are retained for up to seven (7) years as required by applicable financial services and insurance regulations in Botswana. When personal data is no longer required, it is securely deleted or irreversibly anonymised.
            </p>
          </section>

          {/* 13. DATA SECURITY */}
          <section id="data-security">
            <h2 className="text-xl font-bold text-gray-900 mb-4">13. DATA SECURITY</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organisational measures to protect personal data, including encryption of sensitive information at rest and in transit, multi-factor authentication, role-based access controls, continuous monitoring, and regular penetration testing. No method of transmission over the internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          {/* 14. DATA BREACH NOTIFICATION */}
          <section id="breach-notification">
            <h2 className="text-xl font-bold text-gray-900 mb-4">14. DATA BREACH NOTIFICATION</h2>
            <p className="text-gray-600 leading-relaxed">
              In the event of a personal data breach, Nthoppa will notify the Information and Data Protection Commission within seventy-two (72) hours of becoming aware of a breach where it is likely to result in a risk to your rights and freedoms. We will notify affected individuals without undue delay where the breach is likely to result in a high risk to their rights and freedoms.
            </p>
          </section>

          {/* 15. YOUR RIGHTS */}
          <section id="your-rights">
            <h2 className="text-xl font-bold text-gray-900 mb-4">15. YOUR RIGHTS</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Subject to the Act and applicable law, you have the following rights in relation to your personal data. We will respond to all verified requests within thirty (30) calendar days of receipt. This period may be extended by a further sixty (60) days where requests are complex or numerous, in which case we will notify you within the initial 30-day period.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-3">15.1 Right of Access (Section 48)</h3>
            <p className="text-gray-600 leading-relaxed mb-3">You have the right to obtain confirmation of whether we process your personal data and, if so, to receive a copy of that data and information about how it is processed.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">15.2 Right to Rectification (Section 49)</h3>
            <p className="text-gray-600 leading-relaxed mb-3">You have the right to request correction of inaccurate or incomplete personal data without undue delay.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">15.3 Right to Erasure (Section 50)</h3>
            <p className="text-gray-600 leading-relaxed mb-3">You have the right to request deletion of your personal data where it is no longer necessary for the purpose for which it was collected, where consent has been withdrawn, or where processing is unlawful.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">15.4 Right to Restriction of Processing (Section 51)</h3>
            <p className="text-gray-600 leading-relaxed mb-3">You have the right to request that we restrict processing of your data in certain circumstances, for example while accuracy is contested or an objection is being assessed.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">15.5 Right to Data Portability (Section 52)</h3>
            <p className="text-gray-600 leading-relaxed mb-3">You have the right to receive personal data you have provided to us in a structured, commonly used, and machine-readable format, and to transmit that data to another controller where technically feasible.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">15.6 Right to Object (Section 53)</h3>
            <p className="text-gray-600 leading-relaxed mb-3">You have the right to object to processing based on legitimate interests or for direct marketing purposes. Where you object to direct marketing, we will cease that processing immediately.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">15.7 Right Not to be Subject to Automated Decision-Making (Section 33)</h3>
            <p className="text-gray-600 leading-relaxed mb-3">You have the right not to be subject to decisions based solely on automated processing, including profiling, that produce significant effects.</p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">15.8 Right to Lodge a Complaint</h3>
            <p className="text-gray-600 leading-relaxed">
              If you believe your rights under the Act have been violated, you have the right to lodge a complaint with the Information and Data Protection Commission:
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              Website: <a href="https://www.idpc.org.bw" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">www.idpc.org.bw</a><br />
              Physical address: Information and Data Protection Commission, Gaborone, Botswana
            </p>
          </section>

          {/* 16. MARKETING COMMUNICATIONS */}
          <section id="marketing">
            <h2 className="text-xl font-bold text-gray-900 mb-4">16. MARKETING COMMUNICATIONS</h2>
            <p className="text-gray-600 leading-relaxed">
              We will only send marketing communications where you have provided explicit consent or were permitted by applicable law. You may opt out of marketing at any time using in-app notification and marketing settings, the unsubscribe link included in all marketing emails, or by contacting our Data Protection Officer directly. Opting out of marketing will not affect the delivery of essential service communications such as transaction confirmations, policy notices, or security alerts.
            </p>
          </section>

          {/* 17. COOKIES AND ANALYTICS */}
          <section id="cookies">
            <h2 className="text-xl font-bold text-gray-900 mb-4">17. COOKIES AND ANALYTICS</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to enhance functionality, analyse usage, and improve user experience. Essential cookies are set without consent as they are technically necessary. For all other cookies, we will request your consent on first use and each time the cookie policy changes materially. You may manage and withdraw cookie consent at any time through your device or browser settings, or via our in-app cookie preference centre.
            </p>
          </section>

          {/* 18. DATA PROTECTION OFFICER */}
          <section id="dpo">
            <h2 className="text-xl font-bold text-gray-900 mb-4">18. DATA PROTECTION OFFICER</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              Nthoppa has appointed a Data Protection Officer (DPO) to oversee compliance with this Policy and the Act.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Role:</strong> Data Protection Officer (DPO)<br />
              <strong>Organisation:</strong> Nthoppa (Pty) Ltd<br />
              <strong>Email:</strong> <a href="mailto:info@nthoppa.com" className="text-[#FF6B35] hover:underline">info@nthoppa.com</a><br />
              <strong>Phone:</strong> +267 75 736 600<br />
              <strong>IDPC Registration:</strong> Registered with the Information and Data Protection Commission
            </p>
          </section>

          {/* 19. GOVERNING LAW */}
          <section id="governing-law">
            <h2 className="text-xl font-bold text-gray-900 mb-4">19. GOVERNING LAW</h2>
            <p className="text-gray-600 leading-relaxed">
              This Privacy Policy is governed by and interpreted in accordance with the laws of the Republic of Botswana, including the Data Protection Act No. 18 of 2024 and all regulations and subsidiary legislation made thereunder. Any disputes arising in connection with this Policy shall be subject to the jurisdiction of the courts of the Republic of Botswana.
            </p>
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