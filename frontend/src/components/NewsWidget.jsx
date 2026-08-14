import React, { useEffect, useState } from 'react';
import { Newspaper, ExternalLink, Loader2 } from 'lucide-react';

export default function NewsWidget({ sidebar = false }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/news`)
      .then(res => res.json())
      .then(data => {
        if (data.articles) setNews(data.articles);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch news:", err);
        setLoading(false);
      });
  }, []);

  const containerClasses = sidebar 
    ? "h-full flex flex-col mt-4" 
    : "bg-surface border border-border rounded-2xl p-5 shadow-sm h-full flex flex-col";

  return (
    <div className={containerClasses}>
      <div className={`flex items-center gap-2 mb-4 ${sidebar ? 'px-1' : ''}`}>
        <div className="h-8 w-8 rounded-lg bg-accent/10 grid place-items-center shrink-0">
          <Newspaper className="w-4 h-4 text-accent" />
        </div>
        <h3 className={`${sidebar ? 'text-xs uppercase tracking-wider text-muted' : 'text-sm text-primary'} font-bold`}>
          Industry News
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full text-muted">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading...
          </div>
        ) : news.length === 0 ? (
          <div className="text-sm text-muted">No news available at the moment.</div>
        ) : (
          news.map((item, i) => (
            <a 
              key={i} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block group p-3 bg-background border border-border rounded-xl hover:border-accent/40 transition-colors ${sidebar ? 'shadow-sm' : ''}`}
            >
              <h4 className="text-xs font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2 leading-tight mb-1">
                {item.title}
              </h4>
              <div className="flex items-center justify-between text-[10px] text-muted">
                <span className="uppercase tracking-wider truncate mr-2">{item.source}</span>
                <span className="flex items-center gap-1 shrink-0">
                  Read <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
