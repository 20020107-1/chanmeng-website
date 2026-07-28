export type NewsArticle = {
  slug: string
  category: string
  date: string
  title: string
  summary: string
  lead: string
  sections: Array<{ title: string; paragraphs: string[] }>
  sources?: Array<{ title: string; url: string }>
}

const ALL_NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'geo-generative-engine-optimization-guide', category: '增长前沿', date: '2026.07.27', title: 'GEO是什么？企业布局生成式搜索的实用指南',
    summary: '从概念、与SEO的关系到企业落地步骤，读懂生成式引擎优化。',
    lead: '当用户开始直接向AI提问，品牌内容不仅要“被搜索到”，还要能够被生成式引擎理解、核验和引用。GEO由此成为企业内容建设的新课题。',
    sections: [
      { title: 'GEO到底是什么', paragraphs: ['GEO是Generative Engine Optimization的缩写，中文通常译为“生成式引擎优化”。这一概念由学术研究系统提出，关注的是如何提升内容在生成式引擎回答中的可见度。与传统搜索结果页不同，生成式引擎会综合多个来源形成答案，因此内容是否清晰、可信、易于引用变得更加重要。', '需要强调的是，GEO不是一个可以保证“被AI推荐”的捷径。生成式平台的模型、检索机制和引用规则持续变化，企业能做的是提高内容被发现、理解和验证的条件。'] },
      { title: 'GEO不是替代SEO', paragraphs: ['Google最新官方指南明确指出，面向AI搜索功能并不需要特殊的AI文件或专用标记，传统SEO基础仍然有效：页面应当可以抓取和索引，重要信息要以文本呈现，内部链接要清晰，结构化数据必须与页面可见内容一致。', '因此，SEO解决“页面能否被搜索系统可靠发现”，GEO进一步关注“信息能否被生成式系统准确理解和引用”。二者是递进关系，而不是二选一。'] },
      { title: '企业内容如何落地', paragraphs: ['第一，围绕客户真实问题组织内容，在标题或开头直接给出清晰答案；第二，为关键结论提供数据、案例、作者背景和可核验来源；第三，统一企业名称、服务范围、专业领域等实体信息，减少不同页面之间的表述冲突。', '第四，用清楚的层级、列表和问答结构降低理解成本；第五，持续更新过期数据，并建立相关内容之间的内部链接；第六，同时观察自然搜索、品牌词、有效咨询与转化，不把单一“AI引用次数”当作唯一目标。'] },
      { title: '一份务实的GEO检查表', paragraphs: ['发布前可以检查七件事：页面是否回答了一个明确问题；核心结论是否出现在前段；事实是否有来源；内容是否体现企业独有经验；页面是否可以正常索引；结构化数据是否与正文一致；读者看完后是否有清晰的下一步。', 'GEO的本质不是迎合某个模型，而是把企业知识变成更可信、更清楚、更便于机器与人共同理解的公开内容资产。'] },
    ],
    sources: [
      { title: 'GEO: Generative Engine Optimization（原始研究论文）', url: 'https://arxiv.org/abs/2311.09735' },
      { title: 'Google Search Central：AI features and your website', url: 'https://developers.google.com/search/docs/appearance/ai-features' },
      { title: 'Google Search Central：A new resource for optimizing for generative AI', url: 'https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing' },
    ],
  },
  {
    slug: 'tiktok-b2b-global-growth-guide', category: '出海观察', date: '2026.07.27', title: 'TikTok外贸出海：从内容获客到线索成交',
    summary: '建立内容、投放、线索承接与销售跟进相连接的TikTok出海链路。',
    lead: 'TikTok外贸出海不是简单地发布短视频。对B2B企业而言，真正有效的路径是用本地化内容建立信任，用投放验证需求，再把线索稳定交给销售体系。',
    sections: [
      { title: '先明确市场与客户', paragraphs: ['启动前先确定目标国家、客户角色、采购场景和核心问题。同一款产品面对经销商、品牌方与终端采购时，内容重点和行动入口并不相同。账号定位越清楚，后续的选题、语言、本地化和投放测试越容易形成一致性。', '外贸内容不应只展示产品参数。工厂与生产流程、应用场景、质量标准、交付能力、客户常见问题和真实案例，通常更有助于潜在客户判断企业是否值得进一步沟通。'] },
      { title: '内容和付费投放各司其职', paragraphs: ['内容用于持续表达专业能力和建立信任，付费投放用于更快测试市场、受众与素材组合。企业可以围绕“客户问题—解决方案—可信证据—下一步行动”设计短视频，让每条内容承担一个清晰任务。', '测试阶段应同时比较不同开场、卖点、语言版本和行动引导，以有效线索和后续成交质量作为判断依据，而不是只看播放量。任何“爆款”都不等于稳定获客，真正可复制的是持续测试和复盘机制。'] },
      { title: '把流量接入线索系统', paragraphs: ['TikTok官方目前支持站内即时表单和企业自有网站表单两种主要线索路径。即时表单适合减少填写阻力；网站表单更适合提出更详细的资格问题，并承接完整的品牌和产品信息。', 'TikTok官方资料还建议将线索接入CRM。企业应统一记录来源国家、产品兴趣、采购数量、预算和跟进状态，设置明确的首次响应时限。需要注意的是，TikTok Ads Manager对即时表单线索的保存期限有限，重要数据应及时同步或导出。'] },
      { title: '合规决定增长能走多远', paragraphs: ['线索表单需要有效的隐私政策，广告素材与落地页应遵守目标市场、平台政策和当地数据保护要求。收集的信息应以销售判断所必需为限，并向客户说明用途。', '一条专业的TikTok外贸增长链路应当是：市场定位—内容矩阵—小预算测试—线索承接—销售跟进—成交复盘。只有前端流量与后端转化协同，TikTok才会从内容渠道变成可持续的业务渠道。'] },
    ],
    sources: [
      { title: 'TikTok For Business：Lead Generation objective', url: 'https://ads.tiktok.com/help/article/lead-generation-objective' },
      { title: 'TikTok Ads Manager：How to create an Instant Form', url: 'https://ads.tiktok.com/help/article/build-instant-form' },
      { title: 'TikTok For Business：How to access Leads data', url: 'https://ads.tiktok.com/help/article/access-leads-data-on-instant-forms' },
      { title: 'TikTok For Business：Verified Business Account Lead Generation', url: 'https://ads.tiktok.com/help/article/business-account-lead-generation' },
    ],
  },
  {
    slug: 'growth-service-system-upgrade', category: '公司动态', date: '2026.07.27', title: '企业增长服务体系持续升级',
    summary: '围绕获客、转化与品牌增长，进一步明确服务流程与交付标准。',
    lead: '婵梦科技持续梳理企业增长服务链路，让每一个项目从需求诊断开始，以清晰方案推进，并通过阶段复盘形成可持续优化。',
    sections: [
      { title: '从业务问题开始', paragraphs: ['服务不从工具清单开始，而是先识别企业当前最需要解决的增长问题，包括流量来源、客户转化、团队执行和品牌传播。'] },
      { title: '让过程可追踪', paragraphs: ['项目按照诊断、方案、执行与复盘四个阶段推进，明确阶段目标、协作角色与交付内容，减少沟通成本。'] },
      { title: '以长期价值为方向', paragraphs: ['我们希望帮助客户获得的不只是一次营销动作，而是一套能够持续使用、持续优化的增长方法。'] },
    ],
  },
  {
    slug: 'ai-acquisition-conversion', category: '业务观察', date: '2026.07.18', title: 'AI如何贯穿获客与转化链路',
    summary: 'AI的价值不止是生成内容，更在于提升流程效率和客户响应质量。',
    lead: '当AI进入企业增长流程，真正值得关注的不是单点工具，而是它能否连接内容生产、线索识别、客户沟通和交付复盘。',
    sections: [
      { title: '获客端：提高内容效率', paragraphs: ['通过AI辅助选题、脚本和素材整理，让团队能够更稳定地生产面向目标客户的内容。'] },
      { title: '转化端：提升响应质量', paragraphs: ['围绕客户需求建立标准化信息整理和跟进机制，让销售沟通更及时、更有针对性。'] },
      { title: '管理端：沉淀可复用经验', paragraphs: ['将项目过程中的有效方法、客户问题与交付经验结构化，逐步形成企业自己的增长知识库。'] },
    ],
  },
  {
    slug: 'partnership-growth-ecosystem', category: '婵梦观点', date: '2026.07.08', title: '合伙共创，连接企业需求与专业能力',
    summary: '以透明规则连接企业、人才与业务机会，让专业能力形成长期价值。',
    lead: '合伙并不是简单的资源撮合，而是基于明确分工、共同目标和长期规则建立的协作关系。',
    sections: [
      { title: '企业获得增长支持', paragraphs: ['企业可以按业务问题连接对应能力，减少从零组建团队和反复试错的成本。'] },
      { title: '人才获得实践路径', paragraphs: ['具备专业能力的人才可以参与真实项目，在实践中提升能力并积累长期合作经验。'] },
      { title: '合作建立在透明规则上', paragraphs: ['明确项目边界、价值分配和交付责任，让合作建立在可持续、可复盘的基础上。'] },
    ],
  },
]

export const NEWS_ARTICLES = ALL_NEWS_ARTICLES.filter((article) => article.slug !== 'tiktok-b2b-global-growth-guide')

export function getNewsArticle(slug: string) { return NEWS_ARTICLES.find((article) => article.slug === slug) }
