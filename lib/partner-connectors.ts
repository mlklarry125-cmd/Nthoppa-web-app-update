export interface FinancialProduct {
  id: string;
  name: string;
  type: 'insurance';
  subtype: string;
  provider: string;
  providerFullName: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  eligibilityCriteria: string[];
  pricingBands: { label: string; rate?: string; excess?: string }[];
  minimumPremium?: string;
  coverOptions?: { label: string; benefit: string; monthlyPremium: string; annualPremium?: string }[];
  notes?: string[];
  color: string;
}

export interface PartnerConnector {
  getProducts(): Promise<FinancialProduct[]>;
}

export class WestlifeConnector implements PartnerConnector {
  async getProducts(): Promise<FinancialProduct[]> {
    return [

      {
        id: 'wl-motor-local',
        name: 'Motor Insurance — Local Vehicle',
        type: 'insurance',
        subtype: 'motor_local',
        provider: 'Westlife Insurance Botswana',
        providerFullName: 'Westlife Insurance Botswana (Pty) Ltd',
        rating: 4.4,
        reviewCount: 1200,
        description: 'Full comprehensive motor insurance for locally registered private vehicles. Covers accident damage, fire, theft, accessories, and third-party liabilities including bodily injury and property damage.',
        features: [
          'Full comprehensive cover — accident, fire, total loss & theft',
          'Third-party liability including bodily injury',
          'Third-party property damage up to policy limit',
          'Social, Domestic & Pleasure use including commuting',
          'VAT & 10% Broker commission inclusive',
          'Minimum annual premium BWP 3,000',
        ],
        eligibilityCriteria: [
          'Locally registered private vehicle',
          'Social, Domestic & Pleasure use only',
          "Valid Botswana driver's licence",
          'Roadworthy certificate required',
        ],
        pricingBands: [
          { label: 'Up to BWP 100,000', rate: '3.50% of vehicle value', excess: '5% of claim, min BWP 3,000' },
          { label: 'BWP 100,001 – BWP 200,000', rate: '3.00% of vehicle value', excess: '5% of claim, min BWP 3,500' },
          { label: 'BWP 200,001 – BWP 300,000', rate: '3.00% of vehicle value', excess: '5% of claim, min BWP 3,500' },
          { label: 'BWP 300,001 – BWP 500,000', rate: '3.00% of vehicle value', excess: '5% of claim, min BWP 4,000' },
          { label: 'BWP 500,001 – BWP 800,000', rate: '3.00% of vehicle value', excess: '5% of claim, min BWP 4,500' },
          { label: 'BWP 800,001 – BWP 1,000,000', rate: '3.00% of vehicle value', excess: '5% of claim, min BWP 5,000' },
          { label: 'BWP 1,000,000 and above', rate: '3.00% of vehicle value', excess: '5% of claim, min BWP 5,000' },
        ],
        minimumPremium: 'BWP 3,000 per annum',
        notes: [
          'Underage driver (<27 years): Additional 5% excess per claim.',
          'Licence issued <2 years from policy date: Additional 5% excess.',
          'Theft/Hijacking: 15% excess, or 10% with approved tracking device.',
          'Windscreen excess: 20% of claim, min BWP 350.',
          'Loss of keys excess: 20% of claim, min BWP 350.',
          'All premiums inclusive of 10% Broker commission and VAT.',
          'Quote valid 30 days from date of issue.',
        ],
        color: 'bg-blue-900',
      },

      {
        id: 'wl-motor-import',
        name: 'Motor Insurance — Import Vehicle',
        type: 'insurance',
        subtype: 'motor_import',
        provider: 'Westlife Insurance Botswana',
        providerFullName: 'Westlife Insurance Botswana (Pty) Ltd',
        rating: 4.3,
        reviewCount: 870,
        description: 'Full comprehensive motor insurance for imported vehicles registered in Botswana. Covers accident damage, fire, theft, and third-party liabilities. Higher rates reflect import vehicle risk.',
        features: [
          'Full comprehensive cover — accident, fire, total loss & theft',
          'Third-party liability including bodily injury',
          'Third-party property damage up to policy limit',
          'Social, Domestic & Pleasure use including commuting',
          'VAT & 10% Broker commission inclusive',
          'Minimum annual premium BWP 3,000',
        ],
        eligibilityCriteria: [
          'Imported vehicle registered in Botswana',
          'Private use only (Social, Domestic & Pleasure)',
          "Valid Botswana driver's licence",
          'Roadworthy certificate required',
          'Vehicle value up to BWP 500,000',
        ],
        pricingBands: [
          { label: 'Up to BWP 100,000', rate: '4.50% of vehicle value', excess: '5% of claim, min BWP 3,000' },
          { label: 'BWP 100,001 – BWP 200,000', rate: '4.25% of vehicle value', excess: '5% of claim, min BWP 3,500' },
          { label: 'BWP 200,001 – BWP 300,000', rate: '4.00% of vehicle value', excess: '5% of claim, min BWP 3,500' },
          { label: 'BWP 300,001 – BWP 500,000', rate: '3.50% of vehicle value', excess: '5% of claim, min BWP 4,000' },
        ],
        minimumPremium: 'BWP 3,000 per annum',
        notes: [
          'Underage driver (<27 years): Additional 5% excess per claim.',
          'Licence issued <2 years from policy date: Additional 5% excess.',
          'Theft/Hijacking: 15% excess, or 10% with approved tracking device.',
          'Windscreen excess: 20% of claim, min BWP 350.',
          'Loss of keys excess: 20% of claim, min BWP 350.',
          'All premiums inclusive of 10% Broker commission and VAT.',
          'Quote valid 30 days from date of issue.',
        ],
        color: 'bg-blue-800',
      },

      {
        id: 'wl-householders',
        name: 'Householders Insurance',
        type: 'insurance',
        subtype: 'household',
        provider: 'Westlife Insurance Botswana',
        providerFullName: 'Westlife Insurance Botswana (Pty) Ltd',
        rating: 4.2,
        reviewCount: 640,
        description: 'Contents insurance for your home covering all household goods and personal possessions. Minimum sum insured BWP 50,000. Flat excess of BWP 500 per claim.',
        features: [
          'Covers all household contents and possessions',
          'Minimum sum insured BWP 50,000',
          'Flat excess BWP 500 per claim',
          'Tiered rates — lower rates for higher sum insured',
          'VAT & 10% Broker commission inclusive',
          'Minimum annual premium BWP 500',
        ],
        eligibilityCriteria: [
          'Botswana resident',
          'Valid ID document',
          'Contents inventory may be required for high-value bands',
        ],
        pricingBands: [
          { label: 'Sum Insured BWP 50,000 – BWP 150,000', rate: '1.80% of sum insured', excess: 'Flat BWP 500' },
          { label: 'Sum Insured BWP 150,001 – BWP 250,000', rate: '1.00% of sum insured', excess: 'Flat BWP 500' },
          { label: 'Sum Insured BWP 250,001 – BWP 500,000', rate: '0.90% of sum insured', excess: 'Flat BWP 500' },
          { label: 'Sum Insured above BWP 500,000', rate: '0.80% of sum insured', excess: 'Flat BWP 500' },
        ],
        minimumPremium: 'BWP 500 per annum',
        notes: [
          'All premiums inclusive of 10% Broker commission and VAT.',
          'Quote valid 30 days from date of issue.',
        ],
        color: 'bg-purple-900',
      },

      {
        id: 'wl-house-standard',
        name: 'House Owners — Standard Construction',
        type: 'insurance',
        subtype: 'house_owners_standard',
        provider: 'Westlife Insurance Botswana',
        providerFullName: 'Westlife Insurance Botswana (Pty) Ltd',
        rating: 4.3,
        reviewCount: 780,
        description: 'Building insurance for standard brick/mortar construction properties. NIL excess on all claims. FREE Personal Liability extension of BWP 1,000,000 included. Flat rate 0.10% across all bands.',
        features: [
          'Standard brick/mortar construction',
          'Sum insured BWP 100,000 – BWP 5,000,000',
          'NIL excess on all claims',
          'FREE Personal Liability — BWP 1,000,000',
          'Flat rate 0.10% across all bands',
          'Minimum annual premium BWP 750',
        ],
        eligibilityCriteria: [
          'Property owner',
          'Standard brick/mortar construction only',
          'Botswana property',
          'Property valuation certificate may be required',
        ],
        pricingBands: [
          { label: 'Sum Insured BWP 100,000 – BWP 1,000,000', rate: '0.10% of sum insured', excess: 'NIL' },
          { label: 'Sum Insured BWP 1,000,001 – BWP 2,000,000', rate: '0.10% of sum insured', excess: 'NIL' },
          { label: 'Sum Insured BWP 2,000,001 – BWP 3,000,000', rate: '0.10% of sum insured', excess: 'NIL' },
          { label: 'Sum Insured BWP 3,000,001 – BWP 4,000,000', rate: '0.10% of sum insured', excess: 'NIL' },
          { label: 'Sum Insured BWP 4,000,001 – BWP 5,000,000', rate: '0.10% of sum insured', excess: 'NIL' },
        ],
        minimumPremium: 'BWP 750 per annum',
        notes: [
          'Personal Liability BWP 1,000,000 included FREE.',
          'All premiums inclusive of 10% Broker commission and VAT.',
          'Quote valid 30 days from date of issue.',
        ],
        color: 'bg-green-900',
      },

      {
        id: 'wl-house-thatch',
        name: 'House Owners — Thatch/Non-Standard Construction',
        type: 'insurance',
        subtype: 'house_owners_thatch',
        provider: 'Westlife Insurance Botswana',
        providerFullName: 'Westlife Insurance Botswana (Pty) Ltd',
        rating: 4.1,
        reviewCount: 420,
        description: 'Building insurance for thatch, reed or non-standard construction properties. NIL excess. Personal Liability BWP 1,000,000 FREE. Flat rate 0.65% across all bands.',
        features: [
          'Thatch, reed and non-standard construction',
          'Sum insured BWP 100,000 – BWP 5,000,000',
          'NIL excess on all claims',
          'FREE Personal Liability — BWP 1,000,000',
          'Flat rate 0.65% across all bands',
          'Minimum annual premium BWP 350',
        ],
        eligibilityCriteria: [
          'Property owner',
          'Thatch, reed or non-standard construction',
          'Botswana property',
          'Property description and valuation required',
        ],
        pricingBands: [
          { label: 'Sum Insured BWP 100,000 – BWP 1,000,000', rate: '0.65% of sum insured', excess: 'NIL' },
          { label: 'Sum Insured BWP 1,000,001 – BWP 2,000,000', rate: '0.65% of sum insured', excess: 'NIL' },
          { label: 'Sum Insured BWP 2,000,001 – BWP 3,000,000', rate: '0.65% of sum insured', excess: 'NIL' },
          { label: 'Sum Insured BWP 3,000,001 – BWP 4,000,000', rate: '0.65% of sum insured', excess: 'NIL' },
          { label: 'Sum Insured BWP 4,000,001 – BWP 5,000,000', rate: '0.65% of sum insured', excess: 'NIL' },
        ],
        minimumPremium: 'BWP 350 per annum',
        notes: [
          'Personal Liability BWP 1,000,000 included FREE.',
          'All premiums inclusive of 10% Broker commission and VAT.',
          'Quote valid 30 days from date of issue.',
        ],
        color: 'bg-yellow-900',
      },

      {
        id: 'wl-personal-all-risks',
        name: 'Personal All Risks',
        type: 'insurance',
        subtype: 'personal_all_risks',
        provider: 'Westlife Insurance Botswana',
        providerFullName: 'Westlife Insurance Botswana (Pty) Ltd',
        rating: 4.2,
        reviewCount: 530,
        description: 'Cover for portable personal possessions anywhere in Botswana. Each item category has its own rate applied to the item value. Excess is 10% of claim, minimum BWP 350 on all items.',
        features: [
          'Clothing & Personal Effects — 1.00%',
          'Unspecified Items — 2.00%',
          'Cellphones — 6.00%',
          'Camping Equipment — 2.00%',
          'Laptops — 5.00%',
          'Fire Arms — 2.50%',
          'Contact Lenses — 2.50%',
          'Cycles — 2.50%',
          'Jewellery & Antiques — 3.00%',
          'Excess: 10% of claim, min BWP 350 on all items',
        ],
        eligibilityCriteria: [
          'Botswana resident',
          'All items must be specified and valued at inception',
          'Proof of ownership required for high-value items',
        ],
        pricingBands: [
          { label: 'Clothing & Personal Effects', rate: '1.00% of item value', excess: '10% of claim, min BWP 350' },
          { label: 'Unspecified Items', rate: '2.00% of item value', excess: '10% of claim, min BWP 350' },
          { label: 'Cellphones', rate: '6.00% of item value', excess: '10% of claim, min BWP 350' },
          { label: 'Camping Equipment', rate: '2.00% of item value', excess: '10% of claim, min BWP 350' },
          { label: 'Laptops', rate: '5.00% of item value', excess: '10% of claim, min BWP 350' },
          { label: 'Fire Arms', rate: '2.50% of item value', excess: '10% of claim, min BWP 350' },
          { label: 'Contact Lenses', rate: '2.50% of item value', excess: '10% of claim, min BWP 350' },
          { label: 'Cycles', rate: '2.50% of item value', excess: '10% of claim, min BWP 350' },
          { label: 'Jewellery & Antiques', rate: '3.00% of item value', excess: '10% of claim, min BWP 350' },
        ],
        minimumPremium: 'BWP 350 per annum',
        notes: [
          'All items must be specified at inception.',
          'All premiums inclusive of 10% Broker commission and VAT.',
          'Quote valid 30 days from date of issue.',
        ],
        color: 'bg-orange-900',
      },

      {
        id: 'wl-group-life',
        name: 'Group Life Assurance',
        type: 'insurance',
        subtype: 'group_life',
        provider: 'Westlife Insurance Botswana',
        providerFullName: 'Westlife Insurance Botswana (Pty) Ltd',
        rating: 4.5,
        reviewCount: 310,
        description: 'Voluntary group life scheme for Nthoppa members. Death benefit only. Three cover options from BWP 50,000 to BWP 100,000. Free Cover Limit BWP 100,000 — no medical evidence required.',
        features: [
          'Death benefit only — voluntary scheme',
          'Free Cover Limit: BWP 100,000 (no medical evidence needed)',
          'Maximum Death Benefit: BWP 100,000',
          'Entry age: 18–64 years',
          'Cover termination age: 65 years',
          'Months 1–3: Accidental death only covered',
          'Month 4 onwards: Full natural & accidental death',
          'SADC territorial limits apply',
        ],
        eligibilityCriteria: [
          'Nthoppa member aged 18–64',
          'Voluntary scheme — member opts in',
          'Group census/member schedule required',
        ],
        pricingBands: [],
        coverOptions: [
          { label: 'Option 1', benefit: 'BWP 50,000 death benefit', monthlyPremium: 'BWP 22/month', annualPremium: 'BWP 260/year' },
          { label: 'Option 2', benefit: 'BWP 75,000 death benefit', monthlyPremium: 'BWP 32/month', annualPremium: 'BWP 390/year' },
          { label: 'Option 3', benefit: 'BWP 100,000 death benefit', monthlyPremium: 'BWP 43/month', annualPremium: 'BWP 520/year' },
        ],
        minimumPremium: 'BWP 22/month',
        notes: [
          'Months 1–3: Accidental deaths only. Month 4+: Full death benefit.',
          'Policy alteration notice: 1 month. Premature termination: 3 months.',
          'War, Riot and Strike extension: Not included.',
          'Not "Hold Covered" unless endorsed in writing.',
          'All premiums inclusive of 10% Broker commission and VAT.',
          'Quote valid 30 days from 29 January 2026.',
        ],
        color: 'bg-green-800',
      },

      {
        id: 'wl-group-funeral',
        name: 'Group Funeral Scheme',
        type: 'insurance',
        subtype: 'group_funeral',
        provider: 'Westlife Insurance Botswana',
        providerFullName: 'Westlife Insurance Botswana (Pty) Ltd',
        rating: 4.4,
        reviewCount: 890,
        description: 'Voluntary group funeral scheme for Nthoppa members and immediate families. Four cover options from BWP 5,000 to BWP 20,000 per life. Covers main member, spouse, and children from stillborn to age 20.',
        features: [
          'Covers main member, spouse, and all children',
          'Children: stillborn up to age 20 covered',
          'Four cover options (BWP 5,000 – BWP 20,000 per life)',
          'Waiting period: 3 months (member & family)',
          'Suicide waiting period: 24 months',
          'Cover termination at age 100',
          '10% Broker commission inclusive',
        ],
        eligibilityCriteria: [
          'Nthoppa member aged 18–64',
          'Immediate family: spouse + children up to age 20',
          'Voluntary scheme',
        ],
        pricingBands: [],
        coverOptions: [
          { label: 'Option 1 — Member only', benefit: 'BWP 5,000 per member', monthlyPremium: 'BWP 3/month' },
          { label: 'Option 1 — Member & Family', benefit: 'BWP 5,000 per life', monthlyPremium: 'BWP 7/month' },
          { label: 'Option 2 — Member only', benefit: 'BWP 10,000 per member', monthlyPremium: 'BWP 6/month' },
          { label: 'Option 2 — Member & Family', benefit: 'BWP 10,000 per life', monthlyPremium: 'BWP 14/month' },
          { label: 'Option 3 — Member only', benefit: 'BWP 15,000 per member', monthlyPremium: 'BWP 9/month' },
          { label: 'Option 3 — Member & Family', benefit: 'BWP 15,000 per life', monthlyPremium: 'BWP 21/month' },
          { label: 'Option 4 — Member only', benefit: 'BWP 20,000 per member', monthlyPremium: 'BWP 12/month' },
          { label: 'Option 4 — Member & Family', benefit: 'BWP 20,000 per life', monthlyPremium: 'BWP 28/month' },
        ],
        minimumPremium: 'BWP 3/month',
        notes: [
          'Same benefit applies to all children age groups per option.',
          'Waiting period: 3 months for member and immediate family.',
          'Suicide claims waiting period: 24 months.',
          'All premiums inclusive of 10% Broker commission and VAT.',
          'Quote valid 30 days from 29 January 2026.',
        ],
        color: 'bg-teal-900',
      },

      {
        id: 'wl-credit-life',
        name: 'Group Credit Life',
        type: 'insurance',
        subtype: 'credit_life',
        provider: 'Westlife Insurance Botswana',
        providerFullName: 'Westlife Insurance Botswana (Pty) Ltd',
        rating: 4.3,
        reviewCount: 460,
        description: 'Credit life insurance calculated monthly as a percentage of the outstanding loan balance. Covers loans of BWP 500–BWP 5,000 for up to 6 months. Death benefit for main member only.',
        features: [
          'Monthly premium based on outstanding loan balance',
          'Loan amounts: BWP 500 – BWP 5,000',
          'Loan terms: 1 – 6 months',
          'Death benefit — main member only',
          'No waiting period (excluding suicide)',
          'Suicide waiting period: 12 months',
          'Pre-existing condition waiting period: 6 months',
          'Cover termination age: 60 years',
        ],
        eligibilityCriteria: [
          'Nthoppa member with active loan',
          'Loan amount BWP 500 – BWP 5,000',
          'Loan term maximum 6 months',
          'Age below 60 years at cover termination',
        ],
        pricingBands: [
          { label: '1-month loan', rate: '0.14% of outstanding balance — BWP 7 on BWP 5,000 loan' },
          { label: '2-month loan', rate: '0.21% of outstanding balance — BWP 11 on BWP 5,000 loan' },
          { label: '3-month loan', rate: '0.28% of outstanding balance — BWP 14 on BWP 5,000 loan' },
          { label: '4-month loan', rate: '0.36% of outstanding balance — BWP 18 on BWP 5,000 loan' },
          { label: '5-month loan', rate: '0.43% of outstanding balance — BWP 21 on BWP 5,000 loan' },
          { label: '6-month loan', rate: '0.50% of outstanding balance — BWP 25 on BWP 5,000 loan' },
        ],
        minimumPremium: 'BWP 7/month',
        notes: [
          'Premium is recalculated monthly on the outstanding balance.',
          'Suicide waiting period: 12 months.',
          'Pre-existing condition waiting period: 6 months.',
          'Quote valid 30 days from 29 January 2026.',
        ],
        color: 'bg-indigo-900',
      },

      {
        id: 'wl-hospital-cash',
        name: 'Hospital Cash Plan',
        type: 'insurance',
        subtype: 'hospital_cash',
        provider: 'Westlife Insurance Botswana',
        providerFullName: 'Westlife Insurance Botswana (Pty) Ltd',
        rating: 4.4,
        reviewCount: 720,
        description: 'Daily cash payout during hospitalisation for Nthoppa members. Minimum qualifying stay 3 days. Clinic Voucher Bundle of BWP 900 activated from day 4. Complements medical aid with income replacement.',
        features: [
          'Daily cash payout during hospital stay',
          'Minimum qualifying stay: 3 days',
          'BWP 900 Clinic Voucher Bundle from day 4',
          'Complements existing medical aid',
          'Three cover options (BWP 100, 200, 250/day)',
          'Nthoppa members only — proof of hospitalisation required',
        ],
        eligibilityCriteria: [
          'Active Nthoppa Fintech member',
          'Proof of hospitalisation required at claim',
          'KYC onboarding: ID copy/number, physical address, source of funds',
          'KYC claim: Westlife Affidavit or Utility Bill + payslip or bank statement',
        ],
        pricingBands: [],
        coverOptions: [
          { label: 'Option 1 — BWP 100/day', benefit: 'BWP 100 daily + BWP 900 Clinic Voucher from day 4', monthlyPremium: 'BWP 10/month', annualPremium: 'BWP 125/year' },
          { label: 'Option 2 — BWP 200/day', benefit: 'BWP 200 daily + BWP 900 Clinic Voucher from day 4', monthlyPremium: 'BWP 15/month', annualPremium: 'BWP 175/year' },
          { label: 'Option 3 — BWP 250/day', benefit: 'BWP 250 daily + BWP 900 Clinic Voucher from day 4', monthlyPremium: 'BWP 17/month', annualPremium: 'BWP 200/year' },
        ],
        minimumPremium: 'BWP 10/month',
        notes: [
          'BWP 900 Clinic Voucher Bundle activated from day 4 of hospital stay.',
          'KYC at onboarding: ID copy/number + physical address + source of funds.',
          'KYC at claim: completed KYC form + address proof + income proof.',
          'Quote valid 30 days from 29 January 2026.',
        ],
        color: 'bg-red-900',
      },

    ];
  }
}

export const partnerRegistry: Record<string, PartnerConnector> = {
  westlife: new WestlifeConnector(),
};

export async function getAllProducts(): Promise<FinancialProduct[]> {
  const all: FinancialProduct[] = [];
  for (const connector of Object.values(partnerRegistry)) {
    all.push(...await connector.getProducts());
  }
  return all;
}

export async function getProductsByType(type: FinancialProduct['type']): Promise<FinancialProduct[]> {
  return (await getAllProducts()).filter(p => p.type === type);
}

export async function getProductsByProvider(provider: string): Promise<FinancialProduct[]> {
  return (await getAllProducts()).filter(p => p.provider.toLowerCase() === provider.toLowerCase());
}