export type ServiceDetail = {
  slug: string
  title: string
  eyebrow: string
  statement: string
  intro: string
  audience: string[]
  painPoints: string[]
  outcomes: { title: string; description: string }[]
  modules: { title: string; description: string }[]
  scenarios: { title: string; description: string }[]
  process: { title: string; description: string }[]
  deliverables: string[]
  boundary: string
  faqs: { question: string; answer: string }[]
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'business-diagnosis-positioning',
    title: '商业诊断与差异化定位',
    eyebrow: '01 · BUSINESS DIAGNOSIS',
    statement: '先把商业问题看清，再决定增长从哪里开始。',
    intro: '围绕商业模式、品牌与产品定位、客户价值主张进行系统诊断，找出企业增长链路中最关键的矛盾，形成后续产品、内容、获客与转化的统一起点。',
    audience: ['业务方向较多但主线不清晰的企业', '准备推出新产品或进入新市场的团队', '有专业能力但客户认知模糊的个人IP'],
    painPoints: ['业务很多，但客户无法快速理解核心价值', '产品、内容和销售各自表达，品牌定位不一致', '持续投入流量，却没有明确目标客户与价值主张', '团队对优先级判断不同，执行资源反复分散'],
    outcomes: [
      { title: '方向清晰', description: '明确目标客户、核心问题和增长优先级。' },
      { title: '差异明确', description: '建立能够被客户感知的品牌与产品差异。' },
      { title: '行动统一', description: '让产品、内容、获客和销售围绕同一价值主张推进。' },
    ],
    modules: [
      { title: '商业模式诊断', description: '梳理客户、产品、收入、渠道与关键成本，识别主要增长阻力。' },
      { title: '品牌与产品定位', description: '明确企业在目标市场中的位置、边界与差异化认知。' },
      { title: '客户价值主张', description: '把专业能力转化为客户容易理解、相信和选择的价值表达。' },
    ],
    scenarios: [
      { title: '战略升级', description: '业务进入新阶段，需要重新明确增长主线和资源重点。' },
      { title: '新品上市', description: '在投入内容和流量前，先验证客户、场景与产品价值。' },
      { title: '品牌重塑', description: '解决对外表达分散、客户认知模糊和差异不足的问题。' },
    ],
    process: [
      { title: '资料访谈', description: '收集业务现状、客户反馈、产品资料与经营数据。' },
      { title: '问题诊断', description: '识别商业模式、定位、产品与增长链路的关键矛盾。' },
      { title: '策略共创', description: '形成目标客户、价值主张、差异化与优先级方案。' },
      { title: '路径确认', description: '把策略拆解为产品、内容、获客与转化的下一步行动。' },
    ],
    deliverables: ['商业模式诊断报告', '目标客户与需求地图', '品牌及产品定位', '客户价值主张', '阶段增长路径'],
    boundary: '商业诊断用于提高决策质量，最终经营结果仍受产品、市场、团队执行和资源投入影响，不构成固定营收承诺。',
    faqs: [
      { question: '已经有清晰业务，还需要诊断吗？', answer: '诊断并不等于推倒重来，而是验证现有定位、产品与客户反馈是否一致，并确定最值得优先优化的环节。' },
      { question: '诊断完成后可以内部执行吗？', answer: '可以。交付会形成明确的策略和行动建议，企业可以内部执行，也可以继续选择后续阶段服务。' },
      { question: '需要提供哪些资料？', answer: '通常包括产品资料、客户反馈、历史内容、渠道与销售数据。资料不完整时也可以先通过访谈建立基础判断。' },
    ],
  },
  {
    slug: 'product-content-system',
    title: '产品与内容体系打造',
    eyebrow: '02 · PRODUCT & CONTENT',
    statement: '把定位变成产品，把专业能力变成可持续内容。',
    intro: '基于商业诊断结果设计产品服务体系，沉淀企业知识库，并围绕客户问题生产GEO与短视频内容，让品牌能力能够被持续理解、传播和复用。',
    audience: ['产品结构复杂、客户理解成本高的企业', '内容生产依赖临时灵感的品牌团队', '希望系统沉淀经验与方法的专业服务机构'],
    painPoints: ['产品层级、价格和交付边界不清晰', '专业知识分散在个人经验中，无法规模化复用', '内容与客户真实问题脱节，只有曝光没有信任', 'AI生成内容雷同，缺少品牌事实和专业证据'],
    outcomes: [
      { title: '产品更好卖', description: '把客户问题、服务内容与交付价值组织成清晰产品。' },
      { title: '知识可复用', description: '形成可供内容、销售和交付共同使用的企业知识库。' },
      { title: '内容可持续', description: '建立GEO内容与短视频内容的稳定生产和复盘机制。' },
    ],
    modules: [
      { title: '产品服务设计', description: '设计产品层级、服务范围、定价逻辑、交付标准与复购关系。' },
      { title: '企业知识库', description: '沉淀企业事实、专业方法、案例证据、客户问题与表达规范。' },
      { title: 'GEO与短视频内容', description: '围绕客户搜索和决策场景，建立文章、问答、短视频与栏目体系。' },
    ],
    scenarios: [
      { title: '产品体系升级', description: '将零散服务整理为客户容易选择、团队容易交付的产品。' },
      { title: '企业内容中台', description: '让市场、销售和交付共享统一、准确的知识资产。' },
      { title: '品牌内容运营', description: '围绕重点业务持续生产搜索内容与短视频内容。' },
    ],
    process: [
      { title: '产品梳理', description: '根据定位与客户需求设计产品结构和价值表达。' },
      { title: '知识采集', description: '通过访谈、资料与案例提取企业事实和专业经验。' },
      { title: '内容建模', description: '建立主题、问题、栏目与内容形式之间的关系。' },
      { title: '生产复盘', description: '按计划发布并结合数据与销售反馈持续迭代。' },
    ],
    deliverables: ['产品服务架构', '产品价值与交付说明', '企业知识库', 'GEO问题与选题矩阵', '短视频栏目和脚本'],
    boundary: '内容必须基于企业真实信息并经过专业审核。服务不以批量生成代替品牌判断，也不承诺单条内容必然成为爆款。',
    faqs: [
      { question: '企业知识库主要给谁使用？', answer: '既服务于AI内容生产，也供市场、销售、客服和交付团队统一理解企业事实、产品和客户问题。' },
      { question: '可以只做产品设计吗？', answer: '可以。实际范围会根据企业当前阶段确定，也可以从产品设计开始，再逐步进入知识库和内容体系。' },
      { question: '短视频需要企业自己拍摄吗？', answer: '可根据合作范围由企业拍摄、双方协作或对接执行资源，重点是先建立可持续的栏目、脚本和审核机制。' },
    ],
  },
  {
    slug: 'geo-primary-acquisition',
    title: 'GEO主渠道获客',
    eyebrow: '03 · PRIMARY ACQUISITION',
    statement: '让品牌进入AI答案，也进入精准客户的决策范围。',
    intro: '以GEO为核心流量入口，通过品牌实体信息、问题矩阵、可信证据和可引用内容，提高企业在AI搜索与智能推荐场景中的可见度、可信度与精准需求流量。',
    audience: ['希望进入AI搜索决策场景的企业', '拥有专业服务但线上可见度不足的机构', '需要建立长期搜索资产的品牌与个人IP'],
    painPoints: ['客户开始使用AI寻找服务，但品牌没有进入答案', '企业名称、能力与服务信息在不同渠道不一致', '内容不少，却没有覆盖客户真实决策问题', '只看收录数量，没有连接咨询入口与线索质量'],
    outcomes: [
      { title: 'AI搜索可见', description: '围绕客户真实问题建立持续可检索的品牌入口。' },
      { title: '可信并可引用', description: '统一企业事实、专业证据和来源，提高答案可信度。' },
      { title: '获得精准需求', description: '用决策型内容连接有明确需求的潜在客户。' },
    ],
    modules: [
      { title: '品牌实体建设', description: '统一企业名称、产品服务、专业能力、案例证据和咨询入口。' },
      { title: 'GEO问题矩阵', description: '围绕客户问题、地区、服务与决策意图建立主题覆盖。' },
      { title: '可信内容发布', description: '在适合的渠道持续发布可理解、可核验和可引用的内容。' },
    ],
    scenarios: [
      { title: '专业服务获客', description: '覆盖资质、流程、费用、选择与地区等高意向问题。' },
      { title: '企业品牌可见度', description: '让业务能力、产品信息和证据进入行业问答场景。' },
      { title: '个人IP影响力', description: '把经验、方法和案例沉淀为可持续引用的知识内容。' },
    ],
    process: [
      { title: '现状巡检', description: '检查重点AI平台中的品牌信息和目标问题表现。' },
      { title: '问题建模', description: '建立用户问题、决策意图、主题与企业证据之间的关系。' },
      { title: '内容部署', description: '按平台与场景发布内容，统一事实和咨询入口。' },
      { title: '持续优化', description: '跟踪可见度、准确性和线索质量，调整覆盖策略。' },
    ],
    deliverables: ['AI搜索现状诊断', 'GEO问题矩阵', '品牌实体信息规范', '可信内容与发布计划', '阶段可见度复盘'],
    boundary: 'AI平台模型、联网数据和答案会持续变化。服务改善品牌被发现、理解和引用的基础条件，不承诺固定排名、永久展示或确定线索数量。',
    faqs: [
      { question: 'GEO和传统SEO有什么不同？', answer: 'SEO主要面向搜索结果页面，GEO更关注生成式答案如何理解、引用和呈现品牌信息，两者可以协同而不是相互替代。' },
      { question: '多久可以看到效果？', answer: '不同平台、行业和问题的处理周期不同。项目会先建立信息规范、内容上线和目标问题巡检等可检查指标。' },
      { question: '是否需要大量发布文章？', answer: '重点是问题是否真实、事实是否准确、主题是否完整以及内容能否连接咨询，而不是简单追求数量。' },
    ],
  },
  {
    slug: 'short-video-acquisition',
    title: '短视频辅助获客',
    eyebrow: '04 · GROWTH ACQUISITION',
    statement: '以短视频放大信任，用多渠道带来增量触达。',
    intro: '围绕核心业务和客户问题，通过自然流量、付费投流与多平台增量触达，让短视频成为GEO主渠道之外的辅助获客入口，并与后续线索承接保持一致。',
    audience: ['需要扩大品牌触达面的企业', '有内容基础但线索增长不稳定的团队', '希望验证新客群与新渠道的品牌'],
    painPoints: ['短视频只有播放数据，没有明确获客任务', '自然内容与付费投流彼此割裂，素材无法复用', '不同平台各自运营，品牌表达与咨询入口不一致', '快速扩量时忽视承接能力，造成线索浪费'],
    outcomes: [
      { title: '自然流量积累', description: '用稳定栏目和持续内容获得长期触达。' },
      { title: '付费投流验证', description: '以可控预算测试客群、卖点、素材和行动路径。' },
      { title: '增量渠道触达', description: '将有效内容适配更多平台，扩大精准客户覆盖。' },
    ],
    modules: [
      { title: '自然流量运营', description: '建立栏目、脚本、发布与复盘机制，持续积累内容资产。' },
      { title: '付费投流', description: '围绕目标客户、转化动作和成本边界开展素材测试。' },
      { title: '增量触达', description: '复用有效内容并适配不同平台，形成多触点客户路径。' },
    ],
    scenarios: [
      { title: '新业务冷启动', description: '用内容与小规模投放快速测试客户和价值表达。' },
      { title: '成熟业务扩量', description: '依据有效线索成本和承接能力逐步扩大投入。' },
      { title: '创始人IP', description: '通过持续表达建立专业信任并连接企业业务。' },
    ],
    process: [
      { title: '目标确认', description: '明确短视频在认知、线索或成交中的具体任务。' },
      { title: '内容生产', description: '围绕栏目和客户问题持续产出可复用素材。' },
      { title: '流量测试', description: '结合自然表现和付费数据测试客群与表达。' },
      { title: '增量放大', description: '将有效素材扩展到更多渠道并持续复盘。' },
    ],
    deliverables: ['短视频获客策略', '栏目与脚本体系', '拍摄及发布规范', '投流测试方案', '渠道数据复盘'],
    boundary: '短视频结果同时受到内容质量、平台规则、预算、产品和承接能力影响，不以播放量替代有效线索与经营结果。',
    faqs: [
      { question: '短视频是主获客渠道吗？', answer: '在本增长闭环中，GEO承担主渠道角色，短视频用于放大信任、验证表达和获得增量触达。' },
      { question: '是不是平台越多越好？', answer: '不是。会优先选择与目标客户和团队能力匹配的渠道，再将已验证内容逐步复用。' },
      { question: '投流预算如何确定？', answer: '先根据客单价、目标成本和承接能力设置测试预算，验证素材和客群后再决定是否扩大。' },
    ],
  },
  {
    slug: 'sales-conversion',
    title: '成交转化',
    eyebrow: '05 · SALES CONVERSION',
    statement: '让线索有人接、按路径走，并最终形成客户成交。',
    intro: '连接GEO与短视频带来的线索，优化销售路径、客户沟通、方案呈现、异议处理和后续跟进，让前端流量能够被有效承接并持续转化。',
    audience: ['有咨询但成交效率不稳定的企业', '销售主要依赖个人经验的团队', '高客单、长决策周期的专业服务项目'],
    painPoints: ['咨询进入后没有统一的响应、筛选与分配规则', '销售路径不清晰，客户在多个环节流失', '方案和报价无法充分解释价值与差异', '成交数据没有回流内容和获客环节'],
    outcomes: [
      { title: '线索可承接', description: '建立响应、筛选、分配和持续跟进机制。' },
      { title: '销售路径清晰', description: '统一客户从咨询到方案、异议处理和决策的关键动作。' },
      { title: '客户成交提升', description: '让价值表达、证据和方案更好支撑客户选择。' },
    ],
    modules: [
      { title: '线索承接', description: '设计咨询入口、客户标签、响应标准、分配与跟进节奏。' },
      { title: '销售路径优化', description: '梳理需求诊断、方案呈现、报价与关键决策节点。' },
      { title: '客户成交', description: '完善价值表达、案例证据、异议处理和成交动作。' },
    ],
    scenarios: [
      { title: '高客单咨询', description: '建立从诊断到方案、报价和后续跟进的专业流程。' },
      { title: '私域成交', description: '按客户阶段提供内容、沟通和决策支持。' },
      { title: '团队销售复制', description: '把优秀个人经验沉淀为团队可执行的标准。' },
    ],
    process: [
      { title: '漏斗诊断', description: '分析线索来源、响应、有效率、方案与成交表现。' },
      { title: '路径设计', description: '明确客户阶段、关键动作、责任人与判断标准。' },
      { title: '材料建设', description: '完善诊断、方案、案例、报价和异议处理内容。' },
      { title: '训练复盘', description: '通过真实客户反馈持续优化销售动作。' },
    ],
    deliverables: ['线索承接规则', '销售路径与客户阶段', '需求诊断和方案模板', '异议处理知识库', '成交数据复盘机制'],
    boundary: '成交结果取决于需求、产品价值、价格、线索质量和团队执行。服务用于改善成交体系，不承诺固定成交率或销售额。',
    faqs: [
      { question: '可以只优化销售话术吗？', answer: '可以从话术切入，但通常需要同时检查产品价值、客户阶段和销售材料，避免只改表达不改路径。' },
      { question: '是否包含销售培训？', answer: '可按范围提供流程讲解、材料使用、情景演练和真实项目复盘。' },
      { question: '如何判断优化是否有效？', answer: '会观察响应速度、有效线索率、方案率、成交周期、成交率和流失原因等指标。' },
    ],
  },
  {
    slug: 'investment-business-growth',
    title: '招商及业务增长',
    eyebrow: '06 · BUSINESS GROWTH',
    statement: '把已验证的业务方法复制出去，形成持续营收增长。',
    intro: '在前五个阶段形成清晰定位、产品、获客与成交基础后，进一步设计招商模式、渠道复制与营收增长机制，让单点成功逐步转化为可复制的业务能力。',
    audience: ['拥有成熟产品、准备发展渠道的企业', '需要建立招商与合作伙伴体系的项目', '希望从单点成交走向规模增长的团队'],
    painPoints: ['招商只讲机会，没有清晰产品、政策与交付支撑', '渠道合作依赖个人关系，复制效率低', '新增伙伴后缺少培训、线索、运营和考核机制', '营收增长缺少可持续的客户与渠道结构'],
    outcomes: [
      { title: '招商模式清晰', description: '明确伙伴对象、合作价值、政策、边界与盈利逻辑。' },
      { title: '渠道可以复制', description: '沉淀招募、培训、运营、支持和评价标准。' },
      { title: '营收持续增长', description: '连接新客、渠道、复购与经营数据形成增长机制。' },
    ],
    modules: [
      { title: '招商模式设计', description: '设计伙伴类型、合作权益、盈利空间、政策与风险边界。' },
      { title: '渠道复制', description: '建立招募、签约、培训、获客、交付支持和考核流程。' },
      { title: '营收增长', description: '围绕客户结构、渠道贡献、复购和经营效率持续优化。' },
    ],
    scenarios: [
      { title: '区域渠道发展', description: '建立城市、区域或行业伙伴的合作和支持体系。' },
      { title: '项目招商', description: '完善招商材料、销讲、会议转化和后续承接。' },
      { title: '业务规模化', description: '把已验证的获客、成交和交付经验复制到更多团队。' },
    ],
    process: [
      { title: '基础评估', description: '确认产品、交付、利润和品牌是否具备复制条件。' },
      { title: '模式设计', description: '确定伙伴对象、合作政策、收益与双方责任。' },
      { title: '渠道启动', description: '建立招商内容、会议、签约、培训和运营流程。' },
      { title: '增长复盘', description: '根据渠道质量、营收、交付和续约持续优化。' },
    ],
    deliverables: ['招商模式与政策', '渠道合作方案', '招商内容与销讲材料', '伙伴培训运营机制', '营收增长复盘体系'],
    boundary: '招商和营收增长必须建立在真实产品价值、交付能力和合规经营基础上，不承诺固定签约数量、融资结果或营收规模。',
    faqs: [
      { question: '什么阶段适合做招商？', answer: '通常需要先验证产品价值、成交路径和基础交付能力。若底层尚未稳定，会优先建议完善前置环节。' },
      { question: '是否负责招商会执行？', answer: '可根据范围提供模式、内容、销讲、流程和承接支持，具体会务和执行资源由双方确认。' },
      { question: '如何避免渠道失控？', answer: '通过合作边界、价格规则、品牌规范、培训认证、客户归属和退出机制降低风险。' },
    ],
  },
]

export function getServiceDetail(slug: string) {
  return SERVICE_DETAILS.find((item) => item.slug === slug)
}
