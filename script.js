// API Cache for minimizing requests
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// User thresholds
let userThresholds = {
    children: 1000,
    people: 10000,
    hospitals: 50
};

// Current API data
let currentData = {};

// Fetch data with caching and improved error handling
async function fetchWithCache(url, retries = 3, delay = 1000) {
    const cached = apiCache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                signal: AbortSignal.timeout(10000) // 10 second timeout
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            apiCache.set(url, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.error(`API fetch attempt ${attempt} failed:`, error);
            
            if (attempt === retries) {
                throw error;
            }
            
            // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
        }
    }
}

// Number formatting with commas
function formatNumber(num) {
    if (typeof num !== 'number') return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Animate number changes
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = formatNumber(Math.floor(current));
    }, 16);
}

// Generate comparison text for sliders (improved messaging)
function getComparison(type, value) {
    const comparisons = {
        children: [
            { max: 100, text: "That's an entire elementary school classroom" },
            { max: 1000, text: "That's more than all students in a small school" },
            { max: 5000, text: "That's the entire child population of a small town" },
            { max: 10000, text: "That's more children than many cities have" },
            { max: Infinity, text: "That's more than the child population of most counties" }
        ],
        people: [
            { max: 1000, text: "That's the population of a small neighborhood" },
            { max: 10000, text: "That's the population of a small town" },
            { max: 25000, text: "That's larger than many suburban communities" },
            { max: 50000, text: "That's the size of a mid-sized city" },
            { max: Infinity, text: "That's more than most major cities" }
        ],
        hospitals: [
            { max: 25, text: "That would leave 3 out of 4 hospitals struggling" },
            { max: 50, text: "Half the medical system would collapse" },
            { max: 75, text: "Only 1 in 4 hospitals could function" },
            { max: Infinity, text: "Complete medical system destruction" }
        ]
    };

    const typeComparisons = comparisons[type] || comparisons.children;
    return typeComparisons.find(comp => value <= comp.max)?.text || typeComparisons[typeComparisons.length - 1].text;
}

// Update slider values and comparisons
function updateSlider(type, element, valueElement, comparisonElement) {
    const value = parseInt(element.value);
    userThresholds[type] = value;
    
    // Track threshold changes
    trackUserThreshold(type, value);
    
    if (type === 'hospitals') {
        valueElement.textContent = value + '%';
    } else {
        valueElement.textContent = formatNumber(value);
    }
    
    const comparison = getComparison(type, value);
    comparisonElement.style.opacity = '0';
    setTimeout(() => {
        comparisonElement.textContent = comparison;
        comparisonElement.style.opacity = '1';
    }, 150);
}

// Initialize sliders
function initializeSliders() {
    const childrenSlider = document.getElementById('children-slider');
    const childrenValue = document.getElementById('children-value');
    const childrenComparison = document.getElementById('children-comparison');

    const peopleSlider = document.getElementById('people-slider');
    const peopleValue = document.getElementById('people-value');
    const peopleComparison = document.getElementById('people-comparison');

    const hospitalsSlider = document.getElementById('hospitals-slider');
    const hospitalsValue = document.getElementById('hospitals-value');
    const hospitalsComparison = document.getElementById('hospitals-comparison');

    if (childrenSlider && childrenValue && childrenComparison) {
        childrenSlider.addEventListener('input', () => {
            updateSlider('children', childrenSlider, childrenValue, childrenComparison);
        });
    }

    if (peopleSlider && peopleValue && peopleComparison) {
        peopleSlider.addEventListener('input', () => {
            updateSlider('people', peopleSlider, peopleValue, peopleComparison);
        });
    }

    if (hospitalsSlider && hospitalsValue && hospitalsComparison) {
        hospitalsSlider.addEventListener('input', () => {
            updateSlider('hospitals', hospitalsSlider, hospitalsValue, hospitalsComparison);
        });
    }
}

// Load API data with improved error handling
async function loadApiData() {
    const startTime = Date.now();
    try {
        trackEvent('api_data_loading_started', 'data_source', 'tech_for_palestine');
        
        // Load summary data
        const summaryData = await fetchWithCache('https://data.techforpalestine.org/api/v3/summary.json');
        currentData.summary = summaryData;

        // Load daily casualties
        const dailyData = await fetchWithCache('https://data.techforpalestine.org/api/v2/casualties_daily.json');
        currentData.daily = dailyData;

        // Load infrastructure data
        const infraData = await fetchWithCache('https://data.techforpalestine.org/api/v3/infrastructure-damaged.json');
        currentData.infrastructure = infraData;

        const loadTime = Date.now() - startTime;
        trackEvent('api_data_loaded_successfully', 'data_source', 'tech_for_palestine', loadTime);
        
        return true;
    } catch (error) {
        console.error('Failed to load API data:', error);
        trackEvent('api_data_loading_failed', 'data_source', 'tech_for_palestine_error');
        return false;
    }
}

// Reveal reality section
async function revealReality() {
    // Track the critical moment when user reveals reality
    trackEvent('reality_revealed', 'user_flow', 'calculate_button_clicked');
    trackEvent('final_thresholds', 'user_engagement', 'threshold_summary', {
        children: userThresholds.children,
        people: userThresholds.people,
        hospitals: userThresholds.hospitals
    });
    
    const realitySection = document.getElementById('reality-section');
    const realityData = document.getElementById('reality-data');
    
    if (!realitySection || !realityData) {
        console.error('Reality section elements not found');
        return;
    }
    
    // Show loading state
    realitySection.classList.add('active');
    realityData.innerHTML = '<div class="data-loading"><div class="loading-indicator">Loading current data...</div></div>';
    
    // Scroll to reality section
    realitySection.scrollIntoView({ behavior: 'smooth' });

    // Load data
    const dataLoaded = await loadApiData();
    
    if (dataLoaded && currentData.summary) {
        displayRealityData();
    } else {
        displayErrorState();
    }

    // Generate and show date range display
    setTimeout(() => {
        generateDateRangeDisplay();
        const durationSection = document.getElementById('duration-section');
        if (durationSection) {
            durationSection.classList.add('active');
        }
    }, 3000);

    // Reveal memorial after longer delay
    setTimeout(() => {
        const memorialSection = document.getElementById('memorial-section');
        if (memorialSection) {
            memorialSection.classList.add('active');
        }
    }, 6000);
}

// Calculate days since October 7, 2023
function calculateDaysSince(startDate) {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Display reality data
function displayRealityData() {
    const realityData = document.getElementById('reality-data');
    const lastUpdated = document.querySelector('.last-updated');
    
    if (!realityData || !currentData.summary) {
        displayErrorState();
        return;
    }
    
    const summary = currentData.summary;
    
    // Update last updated timestamp
    if (summary.last_update && lastUpdated) {
        const updateDate = new Date(summary.last_update);
        lastUpdated.textContent = `Last updated: ${updateDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })}`;
    }

    // Announce data load for screen readers
    const announcer = document.getElementById('data-announcer');
    if (announcer) {
        announcer.textContent = 'Real-time data has been loaded showing current casualties and infrastructure damage.';
    }

    const childrenKilled = summary.gaza?.killed?.children || 0;
    const totalKilled = summary.gaza?.killed?.total || 0;
    const womenKilled = summary.gaza?.killed?.women || 0;
    const menKilled = summary.gaza?.killed?.men || 0;
    
    const childrenExcess = Math.round((childrenKilled / userThresholds.children) * 100);
    const peopleExcess = Math.round((totalKilled / userThresholds.people) * 100);
    const hospitalExcess = 85; // Approximate based on reports
    
    const realityContent = `
        <div class="reality-comparison-container">
            <div class="comparison-side your-thresholds">
                <h3 class="comparison-title">Your Thresholds</h3>
                
                <div class="comparison-item">
                    <div class="item-label">Children Deaths</div>
                    <div class="threshold-number">${formatNumber(userThresholds.children)}</div>
                    <div class="impact-text">When you'd call it systematic targeting</div>
                </div>
                
                <div class="comparison-item">
                    <div class="item-label">Total Deaths</div>
                    <div class="threshold-number">${formatNumber(userThresholds.people)}</div>
                    <div class="impact-text">When it becomes "concerning"</div>
                </div>
                
                <div class="comparison-item">
                    <div class="item-label">Hospital Destruction</div>
                    <div class="threshold-number">${userThresholds.hospitals}%</div>
                    <div class="impact-text">When it's "systematic infrastructure targeting"</div>
                </div>
            </div>
            
            <div class="comparison-side current-reality">
                <h3 class="comparison-title">Current Reality</h3>
                
                <div class="comparison-item">
                    <div class="item-label">Children Killed</div>
                    <div class="number-with-indicator">
                        <div class="reality-number">${formatNumber(childrenKilled)}</div>
                        <div class="excess-indicator">${childrenExcess}% above</div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="--progress-width: ${Math.min(childrenExcess, 100)}%;"></div>
                    </div>
                    <div class="impact-text">That's ${Math.round(childrenKilled / 260)} children per day</div>
                </div>
                
                <div class="comparison-item">
                    <div class="item-label">Total Killed</div>
                    <div class="number-with-indicator">
                        <div class="reality-number">${formatNumber(totalKilled)}</div>
                        <div class="excess-indicator">${peopleExcess}% above</div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="--progress-width: ${Math.min(peopleExcess, 100)}%;"></div>
                    </div>
                    <div class="impact-text">Including ${formatNumber(womenKilled)} women and ${formatNumber(menKilled)} men</div>
                </div>
                
                <div class="comparison-item">
                    <div class="item-label">Hospital Destruction</div>
                    <div class="number-with-indicator">
                        <div class="reality-number">${hospitalExcess}%</div>
                        <div class="excess-indicator">${Math.round((hospitalExcess / userThresholds.hospitals) * 100)}% above</div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="--progress-width: ${Math.min(hospitalExcess, 100)}%;"></div>
                    </div>
                    <div class="impact-text">Medical system in complete collapse</div>
                </div>
            </div>
        </div>
    `;

    realityData.classList.remove('data-loading');
    realityData.innerHTML = realityContent;
    
    // Track reality data viewing
    trackEvent('reality_data_viewed', 'user_engagement', 'data_comparison', {
        children_excess: childrenExcess,
        people_excess: peopleExcess,
        hospital_excess: hospitalExcess
    });
    
    // Track shock value metrics for insights
    const avgExcess = Math.round((childrenExcess + peopleExcess + hospitalExcess) / 3);
    if (avgExcess > 200) {
        trackEvent('high_reality_shock', 'user_impact', 'extreme_excess', avgExcess);
    } else if (avgExcess > 100) {
        trackEvent('moderate_reality_shock', 'user_impact', 'significant_excess', avgExcess);
    }
    
    // Ensure equal heights for comparison sides
    setTimeout(() => {
        const sides = document.querySelectorAll('.comparison-side');
        if (sides.length === 2) {
            const maxHeight = Math.max(sides[0].offsetHeight, sides[1].offsetHeight);
            sides.forEach(side => side.style.minHeight = maxHeight + 'px');
        }
    }, 100);
}

// Generate date range display
function generateDateRangeDisplay() {
    const dateRangeContainer = document.getElementById('date-range-display');
    if (!dateRangeContainer) return;
    
    const daysSince = calculateDaysSince('2023-10-07');
    
    dateRangeContainer.innerHTML = `
        <div class="date-range-display">
            <h3>Since October 7, 2023</h3>
            <p>${formatNumber(daysSince)} days of ongoing crisis</p>
            <p style="margin-top: 1rem; color: var(--text-secondary);">
                Every day, the numbers grow. Every day, families are shattered.
                Every day, the world continues to debate thresholds.
            </p>
        </div>
    `;
}

// Display error state
function displayErrorState() {
    const realityData = document.getElementById('reality-data');
    if (!realityData) return;
    
    realityData.innerHTML = `
        <div class="error-message">
            <h3>Unable to Load Current Data</h3>
            <p>We couldn't retrieve the latest statistics from Tech For Palestine's API. This may be due to network issues or API maintenance.</p>
            <p>The last reported figures showed tens of thousands of casualties, including thousands of children.</p>
            <p>Please try refreshing the page or visit <a href="https://data.techforpalestine.org/" target="_blank" rel="noopener">Tech For Palestine</a> directly for current data.</p>
        </div>
    `;
}

// Analytics tracking functions
function trackEvent(action, category, label, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
}

function trackUserThreshold(type, value) {
    trackEvent('threshold_set', 'user_engagement', type, value);
    
    // Track threshold distribution for insights
    let range = '';
    if (type === 'children') {
        if (value <= 500) range = '0-500';
        else if (value <= 2000) range = '501-2000';
        else if (value <= 10000) range = '2001-10000';
        else range = '10000+';
    } else if (type === 'people') {
        if (value <= 5000) range = '0-5000';
        else if (value <= 20000) range = '5001-20000';
        else if (value <= 50000) range = '20001-50000';
        else range = '50000+';
    } else if (type === 'hospitals') {
        if (value <= 25) range = '0-25%';
        else if (value <= 50) range = '26-50%';
        else if (value <= 75) range = '51-75%';
        else range = '76-100%';
    }
    
    trackEvent('threshold_range', 'threshold_distribution', `${type}_${range}`, value);
}

// Content warning functions
function dismissWarning() {
    trackEvent('content_warning_dismissed', 'user_flow', 'warning_modal');
    
    // Use sessionStorage safely
    try {
        sessionStorage.setItem('hasSeenWarning', 'true');
    } catch (e) {
        console.warn('SessionStorage not available:', e);
    }
    
    const warningElement = document.getElementById('content-warning');
    if (warningElement) {
        warningElement.style.display = 'none';
    }
    
    setTimeout(() => {
        const thresholdSection = document.getElementById('threshold-section');
        if (thresholdSection) {
            thresholdSection.classList.add('active');
        }
    }, 1000);
}

// Track scroll behavior and engagement
let scrollTracked = false;
let memorialReached = false;
let timeOnPage = Date.now();

function trackUserEngagement() {
    // Track scroll depth
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > 50 && !scrollTracked) {
            trackEvent('scroll_engagement', 'user_behavior', 'scrolled_50_percent', scrollPercent);
            scrollTracked = true;
        }
        
        // Track if user reaches memorial section
        const memorialSection = document.getElementById('memorial-section');
        if (memorialSection && !memorialReached) {
            const memorialTop = memorialSection.offsetTop;
            if (window.scrollY + window.innerHeight >= memorialTop) {
                trackEvent('memorial_section_reached', 'user_flow', 'final_section_viewed');
                memorialReached = true;
            }
        }
    });

    // Track time spent on page
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - timeOnPage) / 1000);
        trackEvent('session_duration', 'user_behavior', 'time_on_page', timeSpent);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Track page load and user session start
    trackEvent('page_loaded', 'user_flow', 'how_many_more_experience');
    trackEvent('session_started', 'user_behavior', 'interactive_experience');
    
    initializeSliders();
    trackUserEngagement();
    
    // Check if user has seen warning before
    let hasSeenWarning = false;
    try {
        hasSeenWarning = sessionStorage.getItem('hasSeenWarning') === 'true';
    } catch (e) {
        console.warn('SessionStorage not available:', e);
    }
    
    if (hasSeenWarning) {
        dismissWarning();
    } else {
        trackEvent('content_warning_shown', 'user_flow', 'warning_modal_displayed');
    }
});

// Intersection observer for progressive reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -20% 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all content sections
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.content-section').forEach(section => {
        if (section.id !== 'threshold-section') { // Don't auto-reveal threshold section
            sectionObserver.observe(section);
        }
    });
});

// Haptic feedback for mobile
function triggerHaptic() {
    if ('vibrate' in navigator) {
        try {
            navigator.vibrate(10);
        } catch (e) {
            console.warn('Vibration not supported:', e);
        }
    }
}

// Add haptic feedback to button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.calculate-button, .cta-button, .warning-button')) {
        triggerHaptic();
    }
});

// Make functions globally available
window.revealReality = revealReality;
window.dismissWarning = dismissWarning;