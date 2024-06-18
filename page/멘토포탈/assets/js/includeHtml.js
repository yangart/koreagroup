document.addEventListener("DOMContentLoaded", function() {
    // Helper function to create elements with attributes and children
    function createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        for (let attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        return element;
    }

    // Create the new content
    const newPageHeader = createElement('div', { class: 'page-header flex-right' }, [
        createElement('div', { class: 'page-title'}, [
            createElement('h2', { }, ['타이틀 영역'])
        ]),
        createElement('div', { class: 'page-header-topbar' }, [
            createElement('div', {}, [
                createElement('a', { href: '#', class: 'btn-topbar' }, [
                    createElement('i', { class: 'topbar-calendar' })
                ])
            ]),
            createElement('div', { class: 'dropdown topbar-dropdown', id: 'topbarSchedule' }, [
                createElement('button', {
                    type: 'button',
                    class: 'btn-topbar',
                    id: 'topbar-schedule-dropdown',
                    'data-bs-toggle': 'dropdown',
                    'data-bs-auto-close': 'outside',
                    'aria-haspopup': 'true',
                    'aria-expanded': 'false'
                }, [
                    createElement('i', { class: 'topbar-time' })
                ])
            ]),
            createElement('div', { class: 'dropdown topbar-dropdown', id: 'topbarNotification' }, [
                createElement('button', {
                    type: 'button',
                    class: 'btn-topbar',
                    id: 'topbar-notification-dropdown',
                    'data-bs-toggle': 'dropdown',
                    'data-bs-auto-close': 'outside',
                    'aria-haspopup': 'true',
                    'aria-expanded': 'false'
                }, [
                    createElement('i', { class: 'topbar-bell' }),
                    createElement('span', { class: 'badge' }, ['83'])
                ])
            ])
        ])
    ]);

    // Create the new page-topbar content
    const newPageTopbar = createElement('div', { id: 'page-topbar' }, [
        createElement('div', { class: 'navbar-hamburger' }, [
            createElement('button', { type: 'button', class: 'topnav-hamburger', id: 'topnav-hamburger-icon' }, [
                createElement('div', { class: 'hamburger-icon' }, [
                    createElement('span'),
                    createElement('span'),
                    createElement('span')
                ])
            ])
        ])
    ]);

    // Create the new app-menu content
    const newAppMenu = createElement('div', { class: 'app-menu navbar-menu' }, [
        createElement('div', { class: 'navbar-brand-box' }, [
            createElement('a', { href: '#', class: 'logo' }, [
                createElement('img', { src: './assets/img/app-menu-logo@2x.png', alt: '' })
            ]),
            createElement('button', { type: 'button', class: 'btn', id: 'vertical-hover' })
        ]),
        createElement('div', { class: 'app-menu-info' }, [
            createElement('div', { class: 'cate' }, [
                createElement('em', {}, ['정규직']),
                createElement('span', {}, ['2023-11-10'])
            ]),
            createElement('div', { class: 'text' }, ['[컴퓨터강남] 1-1팀']),
            createElement('div', { class: 'name' }, ['홍길동 대리(idididid)']),
            createElement('div', { class: 'link' }, [
                createElement('a', { href: '#' }, ['마이페이지'])
            ])
        ]),
        createElement('div', { id: 'scrollbar' }, [
            createElement('div', { id: 'two-column-menu' }),
            createElement('ul', { class: 'navbar-nav', id: 'navbar-nav' }, [
                createElement('li', { class: 'nav-item' }, [
                    createElement('a', { class: 'nav-link menu-link', href: '#' }, [
                        createElement('i', { class: 'ico1' }),
                        createElement('span', {}, ['대쉬보드'])
                    ])
                ]),
                createElement('li', { class: 'nav-item' }, [
                    createElement('a', { class: 'nav-link menu-link', href: '#' }, [
                        createElement('i', { class: 'ico2' }),
                        createElement('span', {}, ['사업정보'])
                    ])
                ]),
                createElement('li', { class: 'nav-item' }, [
                    createElement('a', { class: 'nav-link menu-link', href: '#' }, [
                        createElement('i', { class: 'ico3' }),
                        createElement('span', {}, ['MY 학생'])
                    ])
                ]),
                createElement('li', { class: 'nav-item' }, [
                    createElement('a', { class: 'nav-link menu-link', href: '#' }, [
                        createElement('i', { class: 'ico4' }),
                        createElement('span', {}, ['인사정보'])
                    ])
                ]),
                createElement('li', { class: 'nav-item' }, [
                    createElement('a', { class: 'nav-link menu-link', href: '#' }, [
                        createElement('i', { class: 'ico5' }),
                        createElement('span', {}, ['교육이수'])
                    ])
                ]),
                createElement('li', { class: 'nav-item' }, [
                    createElement('a', { class: 'nav-link menu-link', href: '#' }, [
                        createElement('i', { class: 'ico6' }),
                        createElement('span', {}, ['커뮤니티'])
                    ])
                ])
            ])
        ]),
        createElement('div', { class: 'app-menu-info type-foot' }, [
            createElement('div', { class: 'text' }, ['로그인 2023-11-10 21:34']),
            createElement('div', { class: 'link' }, [
                createElement('a', { href: '#' }, ['로그아웃'])
            ])
        ])
    ]);

    // Create the new page-footer content
    const newPageFooter = createElement('div', { class: 'page-footer' }, [
        createElement('div', { class: 'page-footer-row' }, [
            createElement('div', { class: 'page-footer-btn-left row gx-8px flex-middle' }, [
                createElement('div', { class: 'col-auto' }, [
                    createElement('select', { id: '' }, [
                        createElement('option', { value: '01' }, ['20']),
                        createElement('option', { value: '02' }, ['30']),
                        createElement('option', { value: '03' }, ['40'])
                    ])
                ]),
                createElement('div', { class: 'col-auto' }, ['검색결과 총 ', createElement('b', {}, ['23']), '건'])
            ]),
            createElement('ul', { class: 'pagination pagination-separated' }, [
                createElement('li', { class: 'page-item disabled' }, [
                    createElement('a', { href: '#', class: 'page-link' }, ['←'])
                ]),
                createElement('li', { class: 'page-item' }, [
                    createElement('a', { href: '#', class: 'page-link' }, ['1'])
                ]),
                createElement('li', { class: 'page-item active' }, [
                    createElement('a', { href: '#', class: 'page-link' }, ['2'])
                ]),
                createElement('li', { class: 'page-item' }, [
                    createElement('a', { href: '#', class: 'page-link' }, ['3'])
                ]),
                createElement('li', { class: 'page-item' }, [
                    createElement('a', { href: '#', class: 'page-link' }, ['4'])
                ]),
                createElement('li', { class: 'page-item' }, [
                    createElement('a', { href: '#', class: 'page-link' }, ['5'])
                ]),
                createElement('li', { class: 'page-item' }, [
                    createElement('a', { href: '#', class: 'page-link' }, ['→'])
                ])
            ]),
            createElement('div', { class: 'page-footer-btn-right' }, [
                createElement('a', { href: '#', class: 'btn btn-outline-first' }, ['다운로드']),
                createElement('a', { href: '#pageModal1', 'data-bs-toggle': 'modal', class: 'btn btn-first' }, ['등록'])
            ])
        ])
    ]);

    // Find the target divs and replace them with new content
    const pageTopbar = document.querySelector('.page-topbar');
    const appMenu = document.querySelector('.app-menu.navbar-menu');
    const pageHeader = document.querySelector('.page-header');
    const pageFooter = document.querySelector('.page-footer');
    
    pageTopbar.replaceWith(newPageTopbar);
    appMenu.replaceWith(newAppMenu);
    pageHeader.replaceWith(newPageHeader);
    pageFooter.replaceWith(newPageFooter);
});
