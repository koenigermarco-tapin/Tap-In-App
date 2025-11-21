-- TAP-IN Assessment Platform - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor after creating a new project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table 1: Assessment Submissions
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Assessment Results
    worker_type VARCHAR(20) CHECK (worker_type IN ('sprinter', 'jogger', 'ultrarunner')),
    leadership_style VARCHAR(20) CHECK (leadership_style IN ('visionary', 'architect', 'facilitator', 'executor')),
    
    -- Team Dynamics Scores (1-20 scale)
    team_trust INTEGER CHECK (team_trust BETWEEN 1 AND 20),
    team_conflict INTEGER CHECK (team_conflict BETWEEN 1 AND 20),
    team_commitment INTEGER CHECK (team_commitment BETWEEN 1 AND 20),
    team_accountability INTEGER CHECK (team_accountability BETWEEN 1 AND 20),
    team_results INTEGER CHECK (team_results BETWEEN 1 AND 20),
    
    -- Individual Question Scores (for detailed analysis)
    worker_scores JSONB, -- Array of 12 scores
    leadership_scores JSONB, -- Array of 14 scores
    team_scores_detail JSONB, -- Array of 20 scores
    
    -- Demographics
    industry VARCHAR(50),
    company_size VARCHAR(20) CHECK (company_size IN ('1-10', '11-50', '51-200', '201-1000', '1000+')),
    role VARCHAR(50),
    years_experience INTEGER,
    country VARCHAR(2), -- ISO country code
    
    -- Session Data
    language VARCHAR(2) CHECK (language IN ('en', 'de')),
    assessment_type VARCHAR(30) CHECK (assessment_type IN ('worker-type', 'leadership-style', 'team-dynamics', 'combined')),
    completion_time_seconds INTEGER,
    device_type VARCHAR(20),
    referrer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    -- Lead Association
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL
);

-- Table 2: Email Leads
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contact Information
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    
    -- Demographics (can be enriched over time)
    industry VARCHAR(50),
    company_size VARCHAR(20),
    role VARCHAR(50),
    company_name VARCHAR(200),
    country VARCHAR(2),
    
    -- Engagement Tracking
    assessments_completed INTEGER DEFAULT 0,
    last_assessment_date TIMESTAMP WITH TIME ZONE,
    email_verified BOOLEAN DEFAULT FALSE,
    newsletter_subscribed BOOLEAN DEFAULT TRUE,
    newsletter_unsubscribed_at TIMESTAMP WITH TIME ZONE,
    
    -- Lead Scoring
    lead_score INTEGER DEFAULT 0, -- 0-100 based on engagement
    lead_status VARCHAR(20) DEFAULT 'new' CHECK (lead_status IN ('new', 'engaged', 'qualified', 'converted', 'lost')),
    
    -- Email Provider Integration
    sendgrid_contact_id VARCHAR(100),
    mailchimp_contact_id VARCHAR(100),
    
    -- Notes
    notes TEXT,
    
    -- Indexes for common queries
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Table 3: Email Events (for tracking engagement)
CREATE TABLE email_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Lead Association
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
    
    -- Event Details
    event_type VARCHAR(20) CHECK (event_type IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed', 'spam_report')),
    email_template VARCHAR(50), -- 'results-delivery', 'welcome', 'nurture-1', etc.
    
    -- Email Content
    subject VARCHAR(255),
    
    -- Tracking
    link_clicked TEXT, -- If event_type = 'clicked', which link
    user_agent TEXT,
    ip_address INET,
    
    -- Provider Details
    sendgrid_message_id VARCHAR(100),
    sendgrid_event_id VARCHAR(100)
);

-- Indexes for Performance
CREATE INDEX idx_assessments_created_at ON assessments(created_at DESC);
CREATE INDEX idx_assessments_industry ON assessments(industry);
CREATE INDEX idx_assessments_worker_type ON assessments(worker_type);
CREATE INDEX idx_assessments_leadership_style ON assessments(leadership_style);
CREATE INDEX idx_assessments_lead_id ON assessments(lead_id);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_industry ON leads(industry);
CREATE INDEX idx_leads_lead_status ON leads(lead_status);
CREATE INDEX idx_leads_lead_score ON leads(lead_score DESC);

CREATE INDEX idx_email_events_lead_id ON email_events(lead_id);
CREATE INDEX idx_email_events_created_at ON email_events(created_at DESC);
CREATE INDEX idx_email_events_event_type ON email_events(event_type);

-- Row Level Security (RLS) Policies
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for assessments (from website)
CREATE POLICY "Allow public assessment submissions" ON assessments
    FOR INSERT
    WITH CHECK (true);

-- Allow public inserts for leads (from website)
CREATE POLICY "Allow public lead creation" ON leads
    FOR INSERT
    WITH CHECK (true);

-- Allow service role full access (for Netlify Functions)
CREATE POLICY "Allow service role all on assessments" ON assessments
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow service role all on leads" ON leads
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow service role all on email_events" ON email_events
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Helpful Views for Analytics

-- View 1: Assessment Overview
CREATE VIEW assessment_overview AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_submissions,
    COUNT(DISTINCT lead_id) as unique_leads,
    COUNT(*) FILTER (WHERE worker_type = 'sprinter') as sprinters,
    COUNT(*) FILTER (WHERE worker_type = 'jogger') as joggers,
    COUNT(*) FILTER (WHERE worker_type = 'ultrarunner') as ultrarunners,
    COUNT(*) FILTER (WHERE leadership_style = 'visionary') as visionaries,
    COUNT(*) FILTER (WHERE leadership_style = 'architect') as architects,
    COUNT(*) FILTER (WHERE leadership_style = 'facilitator') as facilitators,
    COUNT(*) FILTER (WHERE leadership_style = 'executor') as executors,
    ROUND(AVG(team_trust), 2) as avg_trust,
    ROUND(AVG(team_conflict), 2) as avg_conflict,
    ROUND(AVG(team_commitment), 2) as avg_commitment,
    ROUND(AVG(team_accountability), 2) as avg_accountability,
    ROUND(AVG(team_results), 2) as avg_results
FROM assessments
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- View 2: Industry Benchmarks
CREATE VIEW industry_benchmarks AS
SELECT 
    industry,
    COUNT(*) as submissions,
    COUNT(DISTINCT lead_id) as unique_companies,
    ROUND(AVG(team_trust), 2) as avg_trust,
    ROUND(AVG(team_conflict), 2) as avg_conflict,
    ROUND(AVG(team_commitment), 2) as avg_commitment,
    ROUND(AVG(team_accountability), 2) as avg_accountability,
    ROUND(AVG(team_results), 2) as avg_results,
    MODE() WITHIN GROUP (ORDER BY worker_type) as most_common_worker_type,
    MODE() WITHIN GROUP (ORDER BY leadership_style) as most_common_leadership_style
FROM assessments
WHERE industry IS NOT NULL
GROUP BY industry
HAVING COUNT(*) >= 10 -- Only show industries with sufficient data
ORDER BY submissions DESC;

-- View 3: Lead Engagement Funnel
CREATE VIEW lead_funnel AS
SELECT 
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE email_verified = true) as verified_emails,
    COUNT(*) FILTER (WHERE assessments_completed >= 1) as completed_assessment,
    COUNT(*) FILTER (WHERE assessments_completed >= 2) as power_users,
    COUNT(*) FILTER (WHERE lead_status = 'qualified') as qualified_leads,
    COUNT(*) FILTER (WHERE lead_status = 'converted') as converted_customers,
    ROUND(100.0 * COUNT(*) FILTER (WHERE email_verified = true) / COUNT(*), 2) as verification_rate,
    ROUND(100.0 * COUNT(*) FILTER (WHERE assessments_completed >= 1) / COUNT(*), 2) as completion_rate,
    ROUND(100.0 * COUNT(*) FILTER (WHERE lead_status = 'qualified') / COUNT(*), 2) as qualification_rate
FROM leads;

-- Function: Update lead score based on activity
CREATE OR REPLACE FUNCTION update_lead_score()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE leads
    SET 
        lead_score = LEAST(100, (
            (assessments_completed * 20) + -- 20 points per assessment
            (CASE WHEN email_verified THEN 15 ELSE 0 END) + -- 15 points for verification
            (CASE WHEN newsletter_subscribed THEN 10 ELSE 0 END) + -- 10 points for subscription
            (SELECT COUNT(*) * 5 FROM email_events WHERE lead_id = NEW.lead_id AND event_type = 'opened') + -- 5 points per email open
            (SELECT COUNT(*) * 10 FROM email_events WHERE lead_id = NEW.lead_id AND event_type = 'clicked') -- 10 points per click
        )),
        updated_at = NOW()
    WHERE id = NEW.lead_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update lead score when assessment is submitted
CREATE TRIGGER trigger_update_lead_score_on_assessment
AFTER INSERT ON assessments
FOR EACH ROW
WHEN (NEW.lead_id IS NOT NULL)
EXECUTE FUNCTION update_lead_score();

-- Trigger: Auto-update lead score when email event occurs
CREATE TRIGGER trigger_update_lead_score_on_email_event
AFTER INSERT ON email_events
FOR EACH ROW
EXECUTE FUNCTION update_lead_score();

-- Function: Auto-increment assessments_completed on leads table
CREATE OR REPLACE FUNCTION increment_lead_assessments()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.lead_id IS NOT NULL THEN
        UPDATE leads
        SET 
            assessments_completed = assessments_completed + 1,
            last_assessment_date = NEW.created_at,
            updated_at = NOW()
        WHERE id = NEW.lead_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_lead_assessments
AFTER INSERT ON assessments
FOR EACH ROW
WHEN (NEW.lead_id IS NOT NULL)
EXECUTE FUNCTION increment_lead_assessments();

-- Sample Data for Testing (Optional - comment out for production)
/*
INSERT INTO leads (email, first_name, industry, company_size, role) VALUES
('test@hotel.com', 'Maria', 'hospitality', '51-200', 'General Manager'),
('john@hospital.org', 'John', 'healthcare', '201-1000', 'Department Head');

INSERT INTO assessments (worker_type, leadership_style, team_trust, team_conflict, team_commitment, team_accountability, team_results, industry, company_size, role, language, assessment_type) VALUES
('jogger', 'facilitator', 14, 12, 15, 13, 14, 'hospitality', '51-200', 'General Manager', 'en', 'combined'),
('sprinter', 'visionary', 16, 10, 17, 15, 18, 'healthcare', '201-1000', 'Department Head', 'en', 'combined');
*/
