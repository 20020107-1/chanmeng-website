'use client'
import { useEffect,useRef,useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { NEWS_ARTICLES } from '@/data/news'
import { CASE_STUDIES } from '@/data/cases'
import styles from './editorial-journal.module.css'

const entries=[
 {href:CASE_STUDIES[0]?`/cases/${CASE_STUDIES[0].slug}`:'/cases',tags:['案例研究','品牌系统'],title:CASE_STUDIES[0]?.title||'如何让复杂品牌变得清晰可见',summary:CASE_STUDIES[0]?.subtitle||'从真实问题出发，建立可以持续推进的增长路径。',meta:'精选案例 · 项目实践',art:styles.system},
 {href:NEWS_ARTICLES[0]?`/news/${NEWS_ARTICLES[0].slug}`:'/news',tags:['观点','协作方式'],title:NEWS_ARTICLES[0]?.title||'让策略真正进入日常工作的五个方法',summary:NEWS_ARTICLES[0]?.summary||'让策略成为团队做内容、产品和决策时可以反复使用的工作工具。',meta:NEWS_ARTICLES[0]?`${NEWS_ARTICLES[0].date} · 新闻动态`:'增长观察 · 6 分钟阅读',art:styles.network},
 {href:NEWS_ARTICLES[1]?`/news/${NEWS_ARTICLES[1].slug}`:'/news',tags:['项目动态','数字体验'],title:NEWS_ARTICLES[1]?.title||'从定位到上线：一个增长项目的完整过程',summary:NEWS_ARTICLES[1]?.summary||'展示研究、内容、获客和转化如何并行推进。',meta:NEWS_ARTICLES[1]?`${NEWS_ARTICLES[1].date} · 新闻动态`:'项目动态 · 10 分钟阅读',art:styles.type}
]
export function CornerFrameLink({href,children,className=''}:{href:string;children:ReactNode;className?:string}){return <Link href={href} className={`${styles.cornerFrame} ${className}`}>{children}</Link>}
export default function EditorialJournal(){const rootRef=useRef<HTMLElement>(null);const[visible,setVisible]=useState<Set<number>>(new Set());useEffect(()=>{const cards=rootRef.current?.querySelectorAll<HTMLElement>('[data-journal-card]');if(!cards)return;const observer=new IntersectionObserver(items=>{items.forEach(item=>{if(!item.isIntersecting)return;const index=Number((item.target as HTMLElement).dataset.journalCard);setVisible(current=>new Set(current).add(index));observer.unobserve(item.target)})},{threshold:.16,rootMargin:'0px 0px -6% 0px'});cards.forEach(card=>observer.observe(card));return()=>observer.disconnect()},[]);return <section ref={rootRef} className={styles.journal} aria-labelledby="journal-title"><div className={styles.inner}><div className={styles.intro}><h2 id="journal-title">新闻</h2><p>记录项目背后的判断、方法与实践，也分享我们对品牌、设计和数字体验的持续观察。</p><CornerFrameLink href="/news">阅读全部文章</CornerFrameLink></div><div className={styles.list}>{entries.map((entry,index)=><Link key={`${entry.href}-${index}`} href={entry.href} data-journal-card={index} className={`${styles.card} ${visible.has(index)?styles.visible:''}`}><div className={styles.media} aria-hidden="true"><div className={`${styles.art} ${entry.art}`}/></div><div><div className={styles.tags}>{entry.tags.map(tag=><span key={tag}>{tag}</span>)}</div><h3>{entry.title}</h3><p>{entry.summary}</p><span className={styles.date}>{entry.meta}</span></div></Link>)}</div></div></section>}
