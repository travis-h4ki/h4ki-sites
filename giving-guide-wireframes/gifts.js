// Giving Guide 2026 gift data, shared by every wireframe.
// Source: 2026-HGG[Digital].pdf (Dropbox, Oct 22 2026) for names, prices, pages, fund codes.
// Givecloud form IDs, form fund codes and presets: live pull Oct 25 2026 (admin API + public form config).

const GIVE_BASE = 'https://www.hope4kidsinternational.org/give/givingguide/?give=';

const CATEGORIES = [
  { id: 'christmas', name: 'Christmas' },
  { id: 'water', name: 'Water' },
  { id: 'food', name: 'Food' },
  { id: 'health', name: 'Health' },
  { id: 'livelihood', name: 'Homes & Livelihoods' },
  { id: 'school', name: 'School & Faith' },
];

// form: Givecloud form ID (null = no active form). guideFund: code printed in the guide.
// formFund: designation the live form posts to. presets: "auto" = Givecloud automatic
// ($65 / $125 / $225 / $500 / $1,250, default $150), "custom" = set per form.
const GIFTS = [
  { id: 'h4c', name: 'Hope 4 Christmas Celebration', page: 2, cat: 'christmas', top: true,
    line: 'A Christmas party and a gift of food your sponsored child carries home to share.',
    blurb: 'Every sponsored child is included, so no one feels left out. Your gift brings a celebration and a bag of food items for each child and their family.',
    prices: [{ amt: 50, label: 'celebration gift' }],
    form: '59EKZZDK', formName: 'Hope 4 Christmas Celebration', guideFund: '11105', formFund: '11105', presets: 'auto' },

  { id: 'filter', name: 'Water Filtration System', page: 3, cat: 'water',
    line: 'A personal filter that delivers 99.9% safe water for drinking and cooking.',
    blurb: 'Families on remote islands and in flood prone areas often have only contaminated water. Each filter removes harmful bacteria down to one micron.',
    prices: [{ amt: 50, label: 'one filter' }],
    form: '59DKRVEK', formName: 'Water Filtration Systems', guideFund: '41826', formFund: '41826', presets: 'custom' },

  { id: 'ctt', name: 'Circle the Thirsty', page: 3, cat: 'water',
    line: 'Join our monthly partners helping drill wells across Africa and Asia.',
    blurb: 'We will introduce you to the villages your monthly gifts help restore, so you can see the impact you are making.',
    prices: [{ amt: 40, label: 'monthly', monthly: true }],
    form: 'J3D7WPDN', formName: 'Circle the Thirsty', guideFund: '4840', formFund: '4840', presets: 'custom' },

  { id: 'well', name: 'Deep Water Well', page: 4, cat: 'water', top: true,
    line: 'Safe water, hygiene training, and a healthier future for a whole village.',
    blurb: 'A deep water well changes the trajectory of a community facing waterborne disease. Share the cost with others, or call our office to fund a full well.',
    prices: [{ amt: 30, label: 'share the cost' }, { amt: 50, label: 'share the cost' }],
    total: { amt: 10500, label: 'full well' },
    form: 'GZEJGPD2', formName: 'Deep Water Wells', guideFund: '41800', formFund: '41800', presets: 'custom' },

  { id: 'f4k', name: 'Feed a Hungry Child for a Year', page: 5, cat: 'food', top: true,
    line: 'A nutritious meal every day for a full year through Food 4 Kids.',
    blurb: 'A child who is fed can focus, learn, and imagine a future. Give for one child, five, or ten, or join the Food 4 Kids Team with a monthly gift.',
    prices: [{ amt: 60, label: 'one child, one year' }, { amt: 300, label: 'five children' }, { amt: 600, label: 'ten children' },
             { amt: 15, label: 'monthly', monthly: true, form: 'P7EN4WEG' }],
    form: 'PYDVV6DX', formName: 'Child Feeding Program', altForm: 'P7EN4WEG', altFormName: 'Food 4 Kids Team (monthly, guide QR target)',
    guideFund: '11212', formFund: '11212', presets: 'auto' },

  { id: 'mexico', name: 'Feed a Family in Mexico', page: 5, cat: 'food',
    line: 'A food box with a week of staples for a large family in Mexico.',
    blurb: 'This Christmas our goal is to fill 100 boxes. Each one brings comfort, dignity, and peace of mind to a family.',
    prices: [{ amt: 60, label: 'one food box' }], goal: '100 families',
    form: '84D3GRDW', formName: 'Mexico Food Boxes', guideFund: '91201', formFund: '91200', presets: 'auto' },

  { id: 'goats', name: 'Goats', page: 6, cat: 'livelihood',
    line: 'A goat that multiplies into savings, trade, and income for a family.',
    blurb: 'As goats multiply they work like a savings account, opening the door to selling and trading. A gift that keeps on giving.',
    prices: [{ amt: 85, label: 'one goat' }],
    form: 'G2EXX4E6', formName: 'Goats', guideFund: '41103', formFund: '41103', presets: 'auto' },

  { id: 'home', name: 'Safe Home', page: 6, cat: 'livelihood',
    line: 'A permanent brick home for a family, built 50 bricks at a time.',
    blurb: 'Families in Uganda and the Philippines are moving from dirt floors and leaking roofs to a stable foundation. Supporters helped build 8 homes this year.',
    prices: [{ amt: 25, label: '50 bricks' }], total: { amt: 9600, label: 'entire home' },
    form: 'P7DN3WEG', formName: 'Safe Home Repair', guideFund: '41219', formFund: '41219', presets: 'auto' },

  { id: 'cows', name: 'Cows', page: 6, cat: 'livelihood',
    line: 'Two dairy cows that give a graduate with special needs a small business.',
    blurb: 'Includes troughs, medicine, and delivery to the child\'s home. Daily milk and future calves provide steady income and a sense of purpose.',
    prices: [{ amt: 50, label: 'share the cost' }], total: { amt: 1425, label: 'total cost' },
    form: 'KYELL8EW', formName: 'Sustainable Business for a Child with Disabilities', guideFund: '11042', formFund: '11042', presets: 'auto' },

  { id: 'medicine', name: 'Lifesaving Medicine', page: 7, cat: 'health', top: true,
    line: 'Diagnostics, follow up care, and medicine for more than 2,000 children and families.',
    blurb: 'Emergency treatment and preventive care is one of our most urgent needs. Help bring hope and health to those who need it most.',
    prices: [{ amt: 25, label: 'share the cost' }, { amt: 50, label: 'share the cost' }, { amt: 800, label: 'medical outreach' }],
    form: 'G2DX3JE6', formName: 'Life Saving Medicine', guideFund: '11604', formFund: '11604', presets: 'custom' },

  { id: 'bibles', name: 'Bibles', page: 7, cat: 'school',
    line: 'A Bible, or an audio Bible, for new believers beginning their walk with Jesus.',
    blurb: 'Audio Bibles are a blessing in remote areas, where older generations never had the opportunity to learn to read.',
    prices: [{ amt: 10, label: 'one Bible' }, { amt: 60, label: 'six Bibles' }],
    form: 'KJEZX9E2', formName: 'Bibles', guideFund: '11291', formFund: '11291', presets: 'auto' },

  { id: 'bedding', name: 'Bedding', page: 8, cat: 'health', group: 'Health & Wellness',
    line: 'Bedding for a child, part of our Health & Wellness effort in East Africa.',
    blurb: 'Together with nets and mattresses, bedding helps children rest well and stay healthy.',
    prices: [{ amt: 15, label: 'bedding' }], goal: '$5,000 Health & Wellness goal',
    form: null, formName: null, guideFund: '41102', formFund: null, presets: null },

  { id: 'nets', name: 'Mosquito Nets', page: 8, cat: 'health', group: 'Health & Wellness',
    line: 'An insecticide treated net that protects a child from malaria.',
    blurb: 'Malaria remains a major health crisis for children in East Africa. A treated net is essential protection every night.',
    prices: [{ amt: 15, label: 'one net' }], goal: '$5,000 Health & Wellness goal',
    form: 'JLDMW3D8', formName: 'Mosquito Nets', guideFund: '41108', formFund: '41108', presets: 'auto' },

  { id: 'mattress', name: 'Mattresses', page: 8, cat: 'health', group: 'Health & Wellness',
    line: 'A mattress so a child can sleep safely and stay healthy.',
    blurb: 'A good night of rest off the floor supports health and learning.',
    prices: [{ amt: 60, label: 'one mattress' }], goal: '$5,000 Health & Wellness goal',
    form: 'KYDL4XDW', formName: 'Sleeping Kits', guideFund: '41118', formFund: '11118', presets: 'custom' },

  { id: 'trees', name: 'Fruit Trees', page: 8, cat: 'food',
    line: 'Three fruit trees for nourishing food, income from the harvest, and shade.',
    blurb: 'A family can eat and sell the produce for years to come.',
    prices: [{ amt: 60, label: 'three trees' }],
    form: null, formName: null, guideFund: '42031', formFund: null, presets: null },

  { id: 'welding', name: 'Welding Kits', page: 9, cat: 'livelihood',
    line: 'Welding gear and an angle grinder so a graduate can start working right away.',
    blurb: 'Students finish a one year trade certificate ready for a career in a needed industry.',
    prices: [{ amt: 523, label: 'one kit' }],
    form: 'M8D6L4DR', formName: 'Welding Kits', guideFund: '41010', formFund: '41010', presets: 'auto' },

  { id: 'sewing', name: 'Sewing Machines', page: 9, cat: 'livelihood',
    line: 'A sewing machine so a tailoring graduate can open for business.',
    blurb: 'Most clothing in Uganda, including school uniforms, is made to order, so new tailors can begin earning right after their two year certificate.',
    prices: [{ amt: 283, label: 'one machine' }],
    form: 'J3D7M9DN', formName: 'Sewing Machine', guideFund: '41010', formFund: '41010', presets: 'custom' },

  { id: 'sports', name: 'Sports Equipment', page: 9, cat: 'school',
    line: 'Equipment and uniforms for student teams at our vocational and secondary schools.',
    blurb: 'Sports build confidence, leadership, and lifelong healthy habits. Help our teams train with pride and compete with heart.',
    prices: [{ amt: 500, label: 'primary grades' }, { amt: 1250, label: 'secondary grades' }], goal: '$5,800 goal',
    form: 'LGD8NLDV', formName: 'Sports Equipment', guideFund: '11305', formFund: '11305', presets: 'auto' },

  { id: 'coats', name: 'Coats & Hats', page: 10, cat: 'health',
    line: 'A warm coat and hat for a child facing winter in Nepal, Romania, or Namibia.',
    blurb: 'Village homes have little insulation, and coats are often worn inside school all day. Warmth helps a child concentrate on their studies.',
    prices: [{ amt: 50, label: 'coat and hat' }], goal: '$3,000 goal',
    form: 'PYEV52DX', formName: 'Coats & Hats', guideFund: '21101', formFund: '21101', presets: 'auto' },

  { id: 'shoes', name: 'Shoes 4 Children', page: 10, cat: 'health',
    line: 'Shoes that protect feet from cuts, infection, and parasites.',
    blurb: 'For children in many communities we serve, shoes are a matter of health. Give the gift of happy and healthy feet.',
    prices: [{ amt: 25, label: '' }, { amt: 75, label: '' }, { amt: 150, label: '' }],
    form: '8NDR3LEK', formName: 'Shoes 4 Kids', guideFund: '11205', formFund: '11205', presets: 'auto' },

  { id: 'supplies', name: 'School Supplies', page: 10, cat: 'school',
    line: 'Pencils, notebooks, and the essentials a child needs to learn.',
    blurb: 'Education helps break the cycle of poverty, and it starts with the right tools.',
    prices: [{ amt: 60, label: 'supplies for a child' }],
    form: 'GKDP5PER', formName: 'School Supplies', guideFund: '11272', formFund: '11272', presets: 'auto' },
];

const MOST_NEEDED = { form: 'PYEVM6DX', name: 'Where Most Needed', fund: '11015' };

// Items on the live page today that are NOT in the 2026 printed guide.
const LIVE_ONLY = ['Gift a Child Sponsorship', 'Vitamins', 'Chickens', 'Piglets', 'VBS', 'Forgotten Kids',
  'Field Coordinator Motorcycle', 'Gianna Santiago Scholarship Fund'];

const money = n => '$' + n.toLocaleString('en-US');
const giveUrl = form => form ? GIVE_BASE + form : null;
const giftIssues = g => {
  const out = [];
  if (!g.form) out.push('No Givecloud form yet');
  else if (g.formFund !== g.guideFund) out.push(`Form posts to ${g.formFund}, guide prints ${g.guideFund}`);
  if (g.presets === 'auto') out.push('Form presets are Givecloud defaults, not guide prices');
  if (g.id === 'sewing') out.push('Form presets ($60 / $119 / $238) suggest $238, guide says $283');
  if (g.id === 'f4k') out.push('Two forms on fund 11212: one-time vs monthly');
  return out;
};
