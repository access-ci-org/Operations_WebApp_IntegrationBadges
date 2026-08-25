import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import {
    getApplicationRoutesMap,
    getRoutesListNotMentionedInMarkdownContent
} from "./application-routes-util.jsx";
import RouteDetailLink from "./RouteDetailsLink.jsx";
import {Link} from "react-router-dom";


function ReadmeRenderer({markdownFileUrl, showNotMentionedRoutsList = false}) {

    const [markdownContent, setMarkdownContent] = useState("");

    const applicationRoutesMap = getApplicationRoutesMap();

    let notMentionedRoutesList = null;
    if (showNotMentionedRoutsList) notMentionedRoutesList = getRoutesListNotMentionedInMarkdownContent(markdownContent);

    const apiUrl = 'https://api.github.com';
    const repoPath = "access-ci-org/Operations_WebApp_IntegrationBadges";

    useEffect(() => {
        fetch(apiUrl + "/repos/" + repoPath + "/contents" + markdownFileUrl, {})
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch markdown file ' + markdownFileUrl);
                }
                return response.json();
            })
            .then((data) => {
                // GitHub API returns content as Base64 with newlines. Clean and decode it.
                const cleanedBase64 = data.content.replace(/\s/g, '');
                const decodedMarkdown = atob(cleanedBase64);
                setMarkdownContent(decodedMarkdown);
            })
            .catch((err) => {
                console.error('#### Error fetching markdown file: ' + markdownFileUrl, err);
            });
    }, [markdownFileUrl]);

    return (
        <div className="w-100">
            {markdownFileUrl && <div className="w-100 text-end fs-8 mb-2">
                <Link
                    to={"https://github.com/" + repoPath + "/edit/main" + markdownFileUrl}
                    target="_blank" className="btn btn-sm btn-outline-dark">
                    Edit on github
                    <i className="bi bi-github ps-2"></i>
                </Link>
            </div>}
            <ReactMarkdown
                remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({node, hasInjectedHtml, ...validProps}) => {
                        return <h2 {...validProps}/>;
                    },
                    h2: ({node, hasInjectedHtml, ...validProps}) => {
                        return <h3 {...validProps}/>;
                    },
                    h3: ({node, hasInjectedHtml, ...validProps}) => {
                        return <h4 {...validProps}/>;
                    },
                    h4: ({node, hasInjectedHtml, ...validProps}) => {
                        return <h5 {...validProps}/>;
                    },
                    img: ({node, hasInjectedHtml, width, height, ...validProps}) => {
                        return <img {...validProps} className="w-100"/>;
                    },
                    code: ({node, hasInjectedHtml, children, className, ...validProps}) => {
                        if (applicationRoutesMap[children]) {
                            return <RouteDetailLink
                                {...validProps}
                                route={applicationRoutesMap[children]}
                                showPrivacy={true} showPageCount={true}
                                className={className + " fs-7"}
                            />;
                        } else {
                            return <code {...validProps}>{children}</code>;
                        }
                    },
                    table: ({node, hasInjectedHtml, ...validProps}) =>
                        <table className="table" {...validProps} />,
                }}
            >
                {markdownContent}
            </ReactMarkdown>
            {notMentionedRoutesList && notMentionedRoutesList.length > 0 && <div className="pt-5 mt-5 small">
                <h6>Other routes :</h6>
                <ul>
                    {notMentionedRoutesList.map((r, i) => <li key={i}>
                        <RouteDetailLink route={r}/>
                    </li>)}
                </ul>
            </div>}
        </div>
    );
}

export default ReadmeRenderer;
