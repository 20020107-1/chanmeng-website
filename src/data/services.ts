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
    slug: 'ai-search-acquisition',
    title: 'AI搜索获客',
    eyebrow: 'AI SEARCH ACQUISITION',
    statement: '让品牌进入AI答案，也进入客户的决策范围。',
    intro: '围绕用户在AI搜索与智能推荐场景中的真实问题，系统建设企业信息、专业内容与可验证证据，提升品牌被发现、理解和引用的机会。',
    audience: ['希望提升AI搜索可见度的企业', '拥有专业服务但线上表达不清晰的机构', '需要建立长期内容资产的品牌与个人IP'],
    painPoints: ['客户开始使用AI寻找服务，但品牌没有进入答案', '企业名称、服务范围和专业信息在不同渠道不一致', '内容数量不少，却缺少围绕真实问题的系统覆盖', '只关注收录数量，咨询承接和业务转化没有连接'],
    outcomes: [
      { title: '更容易被发现', description: '围绕客户真实提问建立持续可检索的品牌入口。' },
      { title: '更准确地被理解', description: '统一企业事实、服务边界和专业证据，减少信息偏差。' },
      { title: '更清晰地被选择', description: '用决策内容解释适用对象、能力差异和咨询路径。' },
    ],
    modules: [
      { title: 'GEO搜索优化', description: '围绕生成式搜索场景建设问题矩阵、品牌实体信息与可引用内容。' },
      { title: 'AEO答案引擎优化', description: '把企业知识组织成清晰、准确、便于答案引擎理解的结构。' },
      { title: 'LLMO内容优化', description: '根据大模型的信息理解方式，持续完善主题覆盖、事实表达与内容关联。' },
      { title: '自研系统支持', description: '通过系统化记录、发布、巡检与复盘，提高长期运营效率。' },
    ],
    scenarios: [
      { title: '专业服务获客', description: '围绕地区、资质、费用、流程和机构选择建立问题覆盖。' },
      { title: '企业品牌可见度', description: '让品牌能力、产品信息和真实证据进入行业问答场景。' },
      { title: '本地客户决策', description: '组合地区词、服务词和决策词，缩短客户寻找路径。' },
      { title: '个人IP专业影响力', description: '把经验、方法和案例整理为可持续引用的知识内容。' },
    ],
    process: [
      { title: '业务诊断', description: '明确客户、场景、服务边界和优先增长问题。' },
      { title: '问题建模', description: '建立用户问题、决策意图、主题与品牌信息之间的关系。' },
      { title: '内容部署', description: '按平台和场景组织内容，统一企业名称、能力、证据与咨询入口。' },
      { title: '持续优化', description: '跟踪可见度、信息准确性和咨询质量，按结果调整内容覆盖。' },
    ],
    deliverables: ['AI搜索现状诊断', 'GEO/AEO/LLMO问题矩阵', '品牌实体信息规范', '内容与发布计划', '阶段数据复盘'],
    boundary: 'AI平台的模型、联网数据和答案会持续变化。服务目标是改善品牌被发现、理解和引用的基础条件，不承诺固定排名、永久展示或确定成交数量。',
    faqs: [
      { question: 'GEO、AEO和LLMO有什么区别？', answer: 'GEO关注生成式引擎中的品牌可见度，AEO关注内容能否成为直接答案，LLMO关注大模型对品牌、主题和事实的整体理解。项目会按业务目标组合使用，而不是机械拆分。' },
      { question: '多久可以看到效果？', answer: '不同平台、行业和问题的收录周期不同。我们会先建立可检查的阶段指标，包括信息规范、问题覆盖、内容上线与目标问题巡检，再结合实际结果持续调整。' },
      { question: '是否需要大量发布文章？', answer: '重点不是数量，而是问题是否真实、事实是否准确、主题是否完整，以及内容能否连接咨询。低质量的重复内容不会形成长期价值。' },
    ],
  },
  {
    slug: 'ai-content-marketing',
    title: 'AI内容营销',
    eyebrow: 'AI CONTENT MARKETING',
    statement: '把专业能力，持续转化为客户愿意看的内容。',
    intro: '以业务定位和客户决策为起点，借助AI提高策划、生产和迭代效率，建立兼顾传播、信任与转化的内容体系。',
    audience: ['需要稳定内容产能的企业品牌', '希望建立专业影响力的创始人和个人IP', '内容有曝光但难以连接业务的团队'],
    painPoints: ['内容更新依赖临时灵感，产出节奏不稳定', '选题只追热点，与企业业务和客户问题脱节', 'AI生成内容雷同，缺少真实经验和品牌辨识度', '播放与互动有数据，但无法判断是否带来有效客户'],
    outcomes: [
      { title: '提升生产效率', description: '建立AI辅助研究、策划、脚本和多版本生产流程。' },
      { title: '形成内容资产', description: '围绕栏目、主题和客户决策持续积累，而非一次性发布。' },
      { title: '连接真实业务', description: '让内容承担认知、信任、咨询和转化中的明确任务。' },
    ],
    modules: [
      { title: '爆款内容策划', description: '从客户问题、行业变化和业务卖点中提炼具有传播力的选题。' },
      { title: '短视频内容运营', description: '建立栏目、脚本、拍摄、发布与复盘流程，持续形成有效内容。' },
      { title: '直播内容策划', description: '围绕信任建立、产品讲解和咨询转化设计直播内容与节奏。' },
      { title: 'IP与品牌建设', description: '统一定位、表达、视觉和内容资产，让个人与企业形成清晰认知。' },
    ],
    scenarios: [
      { title: '创始人IP', description: '提炼观点、经历和方法，建立专业可信的持续表达。' },
      { title: '企业品牌内容', description: '统一品牌价值、业务能力、案例和服务边界的表达。' },
      { title: '短视频栏目', description: '建立可连续生产的栏目、脚本结构和拍摄规范。' },
      { title: '直播转化内容', description: '设计直播主题、节奏、产品讲解和咨询承接路径。' },
    ],
    process: [
      { title: '定位', description: '明确内容服务谁、解决什么问题，以及最终连接哪项业务。' },
      { title: '策划', description: '建立选题矩阵、内容栏目、表达规范和阶段发布计划。' },
      { title: '生产', description: '用AI辅助研究、脚本与多版本生产，由专业人员完成审核。' },
      { title: '复盘', description: '结合完播、互动、咨询与成交反馈持续校准内容。' },
    ],
    deliverables: ['内容定位与表达规范', '选题及栏目矩阵', '短视频与直播策划', 'AI内容工作流', '月度运营复盘'],
    boundary: 'AI用于提高研究、策划和生产效率，最终内容仍需基于企业真实事实和专业人员审核。我们不以批量生成替代品牌判断，也不承诺单条内容必然成为爆款。',
    faqs: [
      { question: 'AI内容会不会显得很像机器生成？', answer: '项目会先建立品牌事实、表达规范、观点素材和案例库，再由AI辅助生成初稿，最后经过人工编辑与业务审核，避免空泛、重复和失真的表达。' },
      { question: '可以只做短视频吗？', answer: '可以。我们会根据客户目标选择适合的内容形式，也可以将短视频与图文、直播、官网和私域内容协同起来，提高素材复用效率。' },
      { question: '如何判断内容是否有效？', answer: '除播放和互动外，还会观察目标客户占比、主页访问、咨询、线索质量及后续成交反馈，让内容复盘回到真实业务目标。' },
    ],
  },
  {
    slug: 'omnichannel-traffic-operations',
    title: '全域流量运营',
    eyebrow: 'OMNICHANNEL GROWTH',
    statement: '不是增加渠道，而是建立完整的客户获取体系。',
    intro: '整合自然流量、付费投放、短视频、直播、公域触点与私域承接，让不同渠道围绕同一客户和业务目标协同运行。',
    audience: ['客户来源单一、增长不稳定的企业', '投放与内容各自运行、数据无法协同的团队', '需要沉淀私域客户资产的品牌'],
    painPoints: ['客户来源过度依赖单一平台，规则变化就影响增长', '自然流量、广告和自媒体各自运营，目标和数据不统一', '投放带来线索，但客户质量不稳定、销售跟进困难', '公域流量进入私域后缺少标签、内容和持续运营机制'],
    outcomes: [
      { title: '降低渠道依赖', description: '组合自然、付费、公域和私域入口，增强增长稳定性。' },
      { title: '提高流量质量', description: '围绕客户画像、需求和行动路径筛选更适合的流量。' },
      { title: '沉淀客户资产', description: '统一咨询入口、客户标签、跟进节奏和复购运营。' },
    ],
    modules: [
      { title: '自然流量增长', description: '通过搜索、内容与长期信息资产建立稳定的客户入口。' },
      { title: '付费流量投放', description: '围绕明确的客户画像、转化目标与预算边界开展测试和优化。' },
      { title: '短视频与直播获客', description: '用持续内容与实时互动触达客户，并连接清晰的下一步行动。' },
      { title: '公域与私域协同', description: '统一咨询入口、客户标签与跟进节奏，让流量能够沉淀和复用。' },
    ],
    scenarios: [
      { title: '新业务冷启动', description: '用小规模内容和投放测试客户、卖点与渠道匹配度。' },
      { title: '成熟业务扩量', description: '依据有效客户成本和承接能力逐步扩大投入。' },
      { title: '本地客户增长', description: '连接搜索、同城内容、预约、到店与私域复购。' },
      { title: '私域体系升级', description: '完善客户分层、内容触达、销售协同与复购机制。' },
    ],
    process: [
      { title: '渠道盘点', description: '梳理现有流量来源、成本、客户质量与承接能力。' },
      { title: '组合设计', description: '明确自然、付费、公域和私域在客户链路中的分工。' },
      { title: '小步验证', description: '以可控预算测试内容、渠道、客群与承接方案。' },
      { title: '放大复盘', description: '依据有效客户成本和成交反馈分配资源，持续优化。' },
    ],
    deliverables: ['全域流量诊断', '渠道组合与预算建议', '内容及投放计划', '私域承接流程', '流量与转化复盘'],
    boundary: '流量运营结果同时受到产品、价格、市场、预算和销售承接影响。项目按双方确认的渠道、预算和数据条件推进，不以曝光或线索数量替代有效客户和经营结果。',
    faqs: [
      { question: '全域流量是不是所有平台都要做？', answer: '不是。全域的核心是围绕同一个客户旅程合理分工，而不是无限增加渠道。我们会根据团队能力和预算选择少数优先渠道进行验证。' },
      { question: '自然流量和付费投放如何配合？', answer: '付费流量适合快速验证客群和表达，自然流量适合沉淀长期内容资产。两者共享客户问题、素材和转化反馈，可以降低重复试错。' },
      { question: '私域运营主要做什么？', answer: '包括咨询入口、客户标签、跟进规则、内容触达、成交协同和复购服务。私域不是频繁群发广告，而是按客户阶段提供有用的信息。' },
    ],
  },
  {
    slug: 'commercial-conversion-growth',
    title: '商业转化与增长',
    eyebrow: 'COMMERCIAL CONVERSION',
    statement: '让流量被承接，让成交可以复制。',
    intro: '从商业定位、产品与盈利体系出发，连接销讲、私域成交、客户承接和组织执行，把增长从前端流量推进到真实经营结果。',
    audience: ['有流量但成交效率偏低的企业与个人IP', '产品结构和盈利模式需要梳理的项目', '需要招商、路演或组织执行支持的团队'],
    painPoints: ['客户能看见品牌，却不清楚产品价值和选择理由', '产品层级、价格和成交路径混乱，销售只能临场发挥', '前端获客与后端承接断开，线索流失原因无法复盘', '战略方案没有进入岗位、目标和执行节奏，落地效率低'],
    outcomes: [
      { title: '价值更清楚', description: '统一客户、问题、产品和差异化表达，降低理解成本。' },
      { title: '成交更稳定', description: '建立销讲、异议处理、私域跟进和客户承接标准。' },
      { title: '增长可复盘', description: '连接咨询、成交、交付与复购数据，持续优化经营。' },
    ],
    modules: [
      { title: '商业定位与模式设计', description: '明确目标客户、核心价值、业务边界和可持续盈利路径。' },
      { title: '产品与盈利体系', description: '设计产品层级、价格、成交路径与后续复购结构。' },
      { title: '销讲与私域成交', description: '完善线上线下销讲、客户沟通、异议处理和成交承接。' },
      { title: '组织与项目推进', description: '支持招商、融资、路演以及绩效和执行体系建设。' },
    ],
    scenarios: [
      { title: '高客单咨询成交', description: '梳理诊断、方案、报价、异议处理和后续跟进流程。' },
      { title: '个人IP商业化', description: '连接专业定位、产品设计、内容获客和私域成交。' },
      { title: '招商与项目路演', description: '完善商业逻辑、合作价值、销讲材料和现场表达。' },
      { title: '组织执行升级', description: '把业务目标拆解到岗位、关键动作、绩效和复盘机制。' },
    ],
    process: [
      { title: '商业诊断', description: '识别定位、产品、流量、成交和组织环节中的主要阻力。' },
      { title: '体系设计', description: '建立产品结构、成交逻辑、客户旅程和关键经营指标。' },
      { title: '执行落地', description: '通过销讲、私域、项目协同和团队机制推动方案进入业务。' },
      { title: '经营复盘', description: '围绕咨询、成交、交付与复购数据持续调整。' },
    ],
    deliverables: ['商业模式诊断', '产品与盈利体系方案', '销讲和成交流程', '客户承接机制', '组织执行与复盘建议'],
    boundary: '商业转化不是单一话术项目，结果取决于产品价值、市场需求、价格、流量质量和团队执行。我们提供诊断、体系设计和落地支持，不承诺固定成交额、融资结果或招商数量。',
    faqs: [
      { question: '已经有产品，还需要重新设计吗？', answer: '不一定。项目会先判断现有产品与客户需求、价格和成交路径是否匹配，再决定是优化表达、调整结构还是新增产品层级。' },
      { question: '销讲体系包含哪些内容？', answer: '通常包含客户问题、价值主张、产品结构、案例证据、方案呈现、异议处理、行动引导和后续跟进，并根据线上、线下或私域场景调整。' },
      { question: '是否可以只做商业诊断？', answer: '可以。诊断阶段会识别主要阻力和优先级，企业可以选择内部执行，也可以继续由双方共同推进体系设计和落地。' },
    ],
  },
]

export function getServiceDetail(slug: string) {
  return SERVICE_DETAILS.find((item) => item.slug === slug)
}
