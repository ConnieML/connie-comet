import { sections } from './data.js';

document.addEventListener('DOMContentLoaded', () => {

    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (dropdownButton && dropdownMenu) {
        dropdownButton.addEventListener('click', () => {
            dropdownMenu.classList.toggle('hidden');
        });

        window.addEventListener('click', (event) => {
            if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                if (!dropdownMenu.classList.contains('hidden')) {
                    dropdownMenu.classList.add('hidden');
                }
            }
        });
    }

    const roadmapContainer = document.getElementById('roadmap-container');
    const dateContainer = document.getElementById('current-date');

    if (dateContainer) {
        dateContainer.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    if (roadmapContainer) {
        sections.forEach((section, index) => {
            const sectionEl = createSectionElement(section, index + 1);
            roadmapContainer.appendChild(sectionEl);
        });
    }

    lucide.createIcons();
});

function getSectionShortTitle(id) {
    switch (id) {
        case 'financing':
            return 'Financing';
        case 'mvp':
            return 'MVP';
        case 'audience':
            return 'Audience';
        case 'beta':
            return 'Beta Program';
        case 'legal':
            return 'Legal';
        default:
            return id.charAt(0).toUpperCase() + id.slice(1);
    }
}


function createSectionElement(section, index) {
    const sectionWrapper = document.createElement('div');
    sectionWrapper.className = 'roadmap-item relative flex items-start space-x-6 md:space-x-8 pb-12';

    const iconAndLine = `
        <div class="flex-shrink-0 z-10">
            <div class="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-md">
                <i data-lucide="${section.icon}" class="w-7 h-7"></i>
            </div>
        </div>
    `;
    
    const shortTitle = getSectionShortTitle(section.id);
    const dataroomLink = `#dataroom/${section.id}`;
    const dataroomButtonText = `View ${shortTitle} Plan in Dataroom`;

    const documentsBlock = `
        <div class="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h3 class="font-semibold text-lg text-slate-800 mb-3 flex items-center">
                <span class="w-2.5 h-2.5 bg-purple-500 rounded-full mr-3"></span>
                Documents
            </h3>
            <div class="flex flex-row flex-wrap gap-x-6 gap-y-2 mt-3">
                <a href="#" class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors">
                    <i data-lucide="file-text" class="w-4 h-4 mr-2 flex-shrink-0"></i>
                    <span>GTM Plan Details</span>
                </a>
                <a href="#" class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors">
                    <i data-lucide="file-text" class="w-4 h-4 mr-2 flex-shrink-0"></i>
                    <span>Market Research Report</span>
                </a>
                <a href="#" class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors">
                    <i data-lucide="file-text" class="w-4 h-4 mr-2 flex-shrink-0"></i>
                    <span>Financial Projections</span>
                </a>
            </div>
        </div>
    `;

    const content = `
        <div class="flex-grow pt-1">
            <h2 class="text-2xl font-bold text-slate-900 mb-4">${index}. ${section.title}</h2>
            
            <div class="space-y-6">
                <div class="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                    <h3 class="font-semibold text-lg text-slate-800 mb-2 flex items-center">
                        <span class="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-3"></span>
                        Current State
                    </h3>
                    <p class="text-slate-600">${section.currentState}</p>
                </div>
                
                <div class="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                    <h3 class="font-semibold text-lg text-slate-800 mb-2 flex items-center">
                         <span class="w-2.5 h-2.5 bg-green-500 rounded-full mr-3"></span>
                        Strategic Objective
                    </h3>
                    <p class="text-slate-600">${section.objective}</p>
                </div>

                <div class="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                    <h3 class="font-semibold text-lg text-slate-800 mb-2 flex items-center">
                         <span class="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3"></span>
                        Next Steps / Key Actions
                    </h3>
                    <ul class="list-disc list-inside text-slate-600 space-y-1 mt-2">
                        ${section.nextSteps.map(step => `<li>${step}</li>`).join('')}
                    </ul>
                </div>

                ${documentsBlock}
            </div>

            <div class="mt-6 text-right">
                <a href="${dataroomLink}" class="dataroom-button inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg text-center">
                    ${dataroomButtonText}
                    <i data-lucide="arrow-right" class="w-5 h-5 ml-2 flex-shrink-0"></i>
                </a>
            </div>
        </div>
    `;

    sectionWrapper.innerHTML = iconAndLine + content;
    return sectionWrapper;
}
