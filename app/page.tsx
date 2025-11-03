'use client';

import { useState } from 'react';
import {
  Shield,
  Target,
  Users,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Database,
  Code,
  Lock,
  Workflow,
  GitBranch,
  TestTube,
  Server,
  Layers,
  BookOpen,
  Download
} from 'lucide-react';

interface RequirementInput {
  projectName: string;
  clientName: string;
  projectType: string;
  description: string;
  timeline: string;
  teamSize: string;
  budget: string;
  securityLevel: string;
  complianceReqs: string;
  integrations: string;
}

interface ProjectPlan {
  requirements: RequirementInput;
  architecture: ArchitecturePlan;
  security: SecurityPlan;
  sprints: SprintPlan[];
  qualityMetrics: QualityMetrics;
  riskAssessment: RiskItem[];
  resourceAllocation: ResourceAllocation;
  deliverables: Deliverable[];
}

interface ArchitecturePlan {
  frontend: string[];
  backend: string[];
  database: string[];
  infrastructure: string[];
  integrations: string[];
}

interface SecurityPlan {
  authentication: string[];
  authorization: string[];
  dataProtection: string[];
  compliance: string[];
  monitoring: string[];
}

interface SprintPlan {
  number: number;
  duration: string;
  goals: string[];
  stories: string[];
  deliverables: string[];
}

interface QualityMetrics {
  codeReview: string;
  testCoverage: string;
  performanceTargets: string[];
  documentation: string[];
}

interface RiskItem {
  category: string;
  risk: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  mitigation: string;
}

interface ResourceAllocation {
  frontend: number;
  backend: number;
  devops: number;
  qa: number;
  security: number;
  projectManagement: number;
}

interface Deliverable {
  phase: string;
  items: string[];
  timeline: string;
}

export default function Home() {
  const [requirements, setRequirements] = useState<RequirementInput>({
    projectName: '',
    clientName: '',
    projectType: 'web-application',
    description: '',
    timeline: '3-6 months',
    teamSize: '5-10',
    budget: 'enterprise',
    securityLevel: 'high',
    complianceReqs: '',
    integrations: ''
  });

  const [projectPlan, setProjectPlan] = useState<ProjectPlan | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePlan = () => {
    setLoading(true);

    // Simulate processing
    setTimeout(() => {
      const plan: ProjectPlan = {
        requirements,
        architecture: generateArchitecture(requirements),
        security: generateSecurity(requirements),
        sprints: generateSprints(requirements),
        qualityMetrics: generateQualityMetrics(),
        riskAssessment: generateRiskAssessment(requirements),
        resourceAllocation: generateResourceAllocation(requirements),
        deliverables: generateDeliverables(requirements)
      };

      setProjectPlan(plan);
      setLoading(false);
    }, 2000);
  };

  const generateArchitecture = (req: RequirementInput): ArchitecturePlan => {
    return {
      frontend: [
        'React 18.x with TypeScript',
        'Next.js 14 for SSR/SSG',
        'Tailwind CSS for styling',
        'React Query for state management',
        'Zod for validation'
      ],
      backend: [
        'Node.js with Express/NestJS',
        'TypeScript for type safety',
        'RESTful API with OpenAPI/Swagger',
        'GraphQL for complex queries',
        'Microservices architecture'
      ],
      database: [
        'PostgreSQL for relational data',
        'Redis for caching',
        'MongoDB for document storage',
        'Prisma ORM',
        'Database migration strategy'
      ],
      infrastructure: [
        'AWS/Azure cloud platform',
        'Docker containerization',
        'Kubernetes orchestration',
        'CI/CD with GitHub Actions',
        'Terraform for IaC'
      ],
      integrations: req.integrations ? req.integrations.split(',').map(i => i.trim()) : [
        'Payment gateway integration',
        'Third-party API integrations',
        'Notification services',
        'Analytics platforms'
      ]
    };
  };

  const generateSecurity = (req: RequirementInput): SecurityPlan => {
    const isHighSecurity = req.securityLevel === 'high' || req.securityLevel === 'critical';

    return {
      authentication: [
        'OAuth 2.0 / OpenID Connect',
        'Multi-factor authentication (MFA)',
        'JWT with refresh tokens',
        'Session management',
        isHighSecurity ? 'Biometric authentication' : 'Password policies'
      ],
      authorization: [
        'Role-based access control (RBAC)',
        'Attribute-based access control (ABAC)',
        'Least privilege principle',
        'API gateway security',
        'Resource-level permissions'
      ],
      dataProtection: [
        'AES-256 encryption at rest',
        'TLS 1.3 for data in transit',
        'PII data masking',
        'Secure key management (AWS KMS/Azure Key Vault)',
        'Database encryption',
        'Backup encryption'
      ],
      compliance: req.complianceReqs ? req.complianceReqs.split(',').map(c => c.trim()) : [
        'GDPR compliance',
        'SOC 2 Type II',
        'ISO 27001',
        'OWASP Top 10 mitigation',
        'Regular security audits'
      ],
      monitoring: [
        'SIEM integration',
        'Intrusion detection system',
        'Security event logging',
        'Vulnerability scanning',
        'Penetration testing schedule',
        'Incident response plan'
      ]
    };
  };

  const generateSprints = (req: RequirementInput): SprintPlan[] => {
    const timelineMonths = parseInt(req.timeline.split('-')[0]) || 3;
    const sprintCount = Math.ceil(timelineMonths * 2); // 2-week sprints

    const sprintTemplates = [
      {
        goals: ['Project setup and architecture', 'Development environment'],
        stories: ['Setup CI/CD pipeline', 'Configure development environment', 'Setup monitoring and logging'],
        deliverables: ['Infrastructure setup', 'Development guidelines', 'Architecture documentation']
      },
      {
        goals: ['Core authentication and authorization', 'Database schema'],
        stories: ['Implement authentication system', 'Setup database models', 'Create user management'],
        deliverables: ['Auth system', 'Database schema', 'API documentation']
      },
      {
        goals: ['Core business logic', 'Primary features'],
        stories: ['Implement main workflows', 'Build core APIs', 'Frontend components'],
        deliverables: ['Working MVP', 'API endpoints', 'UI components']
      },
      {
        goals: ['Integration and testing', 'Security hardening'],
        stories: ['Third-party integrations', 'Security testing', 'Performance optimization'],
        deliverables: ['Integrated system', 'Security audit report', 'Performance metrics']
      },
      {
        goals: ['UAT and refinement', 'Documentation'],
        stories: ['User acceptance testing', 'Bug fixes', 'Final documentation'],
        deliverables: ['Production-ready system', 'Complete documentation', 'Training materials']
      }
    ];

    return Array.from({ length: Math.min(sprintCount, 12) }, (_, i) => {
      const template = sprintTemplates[i % sprintTemplates.length];
      return {
        number: i + 1,
        duration: '2 weeks',
        goals: template.goals,
        stories: template.stories,
        deliverables: template.deliverables
      };
    });
  };

  const generateQualityMetrics = (): QualityMetrics => {
    return {
      codeReview: 'Mandatory peer review for all PRs, min 2 approvals',
      testCoverage: 'Minimum 80% code coverage, 100% for critical paths',
      performanceTargets: [
        'Page load time < 2 seconds',
        'API response time < 200ms (p95)',
        'Time to Interactive (TTI) < 3 seconds',
        'Lighthouse score > 90',
        'Zero critical vulnerabilities'
      ],
      documentation: [
        'API documentation (OpenAPI/Swagger)',
        'Architecture decision records (ADRs)',
        'Deployment runbooks',
        'User documentation',
        'Code comments for complex logic'
      ]
    };
  };

  const generateRiskAssessment = (req: RequirementInput): RiskItem[] => {
    return [
      {
        category: 'Technical',
        risk: 'Third-party API integration complexity',
        severity: 'Medium',
        mitigation: 'Early POC, fallback strategies, comprehensive testing'
      },
      {
        category: 'Security',
        risk: 'Data breach or unauthorized access',
        severity: 'Critical',
        mitigation: 'Defense-in-depth strategy, regular security audits, penetration testing'
      },
      {
        category: 'Timeline',
        risk: 'Scope creep affecting delivery dates',
        severity: 'High',
        mitigation: 'Strict change control process, prioritization framework, buffer time'
      },
      {
        category: 'Resource',
        risk: 'Key personnel availability',
        severity: 'Medium',
        mitigation: 'Cross-training, documentation, knowledge sharing sessions'
      },
      {
        category: 'Compliance',
        risk: 'Regulatory compliance gaps',
        severity: 'High',
        mitigation: 'Legal review, compliance checklist, third-party audit'
      },
      {
        category: 'Performance',
        risk: 'Scalability issues under load',
        severity: 'Medium',
        mitigation: 'Load testing, horizontal scaling strategy, caching layers'
      }
    ];
  };

  const generateResourceAllocation = (req: RequirementInput): ResourceAllocation => {
    const size = parseInt(req.teamSize.split('-')[0]) || 5;

    return {
      frontend: Math.ceil(size * 0.25),
      backend: Math.ceil(size * 0.3),
      devops: Math.ceil(size * 0.15),
      qa: Math.ceil(size * 0.15),
      security: Math.ceil(size * 0.05),
      projectManagement: Math.ceil(size * 0.1)
    };
  };

  const generateDeliverables = (req: RequirementInput): Deliverable[] => {
    return [
      {
        phase: 'Discovery & Planning',
        items: [
          'Requirements specification document',
          'Technical architecture document',
          'Security assessment report',
          'Project timeline and milestones',
          'Resource allocation plan'
        ],
        timeline: 'Week 1-2'
      },
      {
        phase: 'Design & Prototyping',
        items: [
          'UI/UX wireframes and mockups',
          'Database schema design',
          'API specification',
          'Security architecture',
          'Infrastructure design'
        ],
        timeline: 'Week 3-4'
      },
      {
        phase: 'Development',
        items: [
          'Working application (frontend + backend)',
          'RESTful/GraphQL APIs',
          'Database implementation',
          'Authentication & authorization',
          'Third-party integrations'
        ],
        timeline: 'Week 5-20'
      },
      {
        phase: 'Testing & QA',
        items: [
          'Unit test suite',
          'Integration test suite',
          'End-to-end test suite',
          'Security testing report',
          'Performance testing report',
          'Bug tracking and resolution'
        ],
        timeline: 'Week 18-22'
      },
      {
        phase: 'Deployment & Launch',
        items: [
          'Production environment setup',
          'CI/CD pipeline',
          'Monitoring and alerting',
          'Documentation package',
          'Training materials',
          'Go-live support'
        ],
        timeline: 'Week 23-24'
      }
    ];
  };

  const exportPlan = () => {
    if (!projectPlan) return;

    const planText = JSON.stringify(projectPlan, null, 2);
    const blob = new Blob([planText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${requirements.projectName.replace(/\s+/g, '-')}-project-plan.json`;
    a.click();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Workflow className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enterprise Project Planner</h1>
              <p className="text-sm text-gray-600 mt-1">Agile Development Planning System for Forbes-Listed Clients</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Requirements Form */}
        {!projectPlan && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Project Requirements</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={requirements.projectName}
                  onChange={(e) => setRequirements({ ...requirements, projectName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enterprise CRM System"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name</label>
                <input
                  type="text"
                  value={requirements.clientName}
                  onChange={(e) => setRequirements({ ...requirements, clientName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Fortune 500 Company"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Type</label>
                <select
                  value={requirements.projectType}
                  onChange={(e) => setRequirements({ ...requirements, projectType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="web-application">Web Application</option>
                  <option value="mobile-app">Mobile Application</option>
                  <option value="api-platform">API Platform</option>
                  <option value="saas-product">SaaS Product</option>
                  <option value="enterprise-system">Enterprise System</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Timeline</label>
                <select
                  value={requirements.timeline}
                  onChange={(e) => setRequirements({ ...requirements, timeline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="12+ months">12+ months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Team Size</label>
                <select
                  value={requirements.teamSize}
                  onChange={(e) => setRequirements({ ...requirements, teamSize: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="3-5">3-5 people</option>
                  <option value="5-10">5-10 people</option>
                  <option value="10-20">10-20 people</option>
                  <option value="20+">20+ people</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                <select
                  value={requirements.budget}
                  onChange={(e) => setRequirements({ ...requirements, budget: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="startup">Startup ($50K-$150K)</option>
                  <option value="growth">Growth ($150K-$500K)</option>
                  <option value="enterprise">Enterprise ($500K+)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Security Level</label>
                <select
                  value={requirements.securityLevel}
                  onChange={(e) => setRequirements({ ...requirements, securityLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="standard">Standard</option>
                  <option value="high">High</option>
                  <option value="critical">Critical (Healthcare/Finance)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Compliance Requirements</label>
                <input
                  type="text"
                  value={requirements.complianceReqs}
                  onChange={(e) => setRequirements({ ...requirements, complianceReqs: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="HIPAA, SOC 2, GDPR (comma separated)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Description</label>
                <textarea
                  value={requirements.description}
                  onChange={(e) => setRequirements({ ...requirements, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the project scope, key features, and business objectives..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Required Integrations</label>
                <input
                  type="text"
                  value={requirements.integrations}
                  onChange={(e) => setRequirements({ ...requirements, integrations: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Stripe, Salesforce, AWS (comma separated)"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={generatePlan}
                disabled={loading || !requirements.projectName || !requirements.clientName}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    Generate Project Plan
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Project Plan Display */}
        {projectPlan && (
          <div className="space-y-6">
            {/* Header with Export */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{projectPlan.requirements.projectName}</h2>
                  <p className="text-gray-600 mt-1">Client: {projectPlan.requirements.clientName}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={exportPlan}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Export Plan
                  </button>
                  <button
                    onClick={() => setProjectPlan(null)}
                    className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    New Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Architecture Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Technical Architecture</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-gray-900">Frontend</h4>
                  </div>
                  <ul className="space-y-2">
                    {projectPlan.architecture.frontend.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Server className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-gray-900">Backend</h4>
                  </div>
                  <ul className="space-y-2">
                    {projectPlan.architecture.backend.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-gray-900">Database & Storage</h4>
                  </div>
                  <ul className="space-y-2">
                    {projectPlan.architecture.database.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-gray-900">Infrastructure</h4>
                  </div>
                  <ul className="space-y-2">
                    {projectPlan.architecture.infrastructure.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900">Security Architecture</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-gray-900">Authentication</h4>
                  </div>
                  <ul className="space-y-2">
                    {projectPlan.security.authentication.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-gray-900">Authorization</h4>
                  </div>
                  <ul className="space-y-2">
                    {projectPlan.security.authorization.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-gray-900">Data Protection</h4>
                  </div>
                  <ul className="space-y-2">
                    {projectPlan.security.dataProtection.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-gray-900">Compliance</h4>
                  </div>
                  <ul className="space-y-2">
                    {projectPlan.security.compliance.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 md:col-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-gray-900">Monitoring & Response</h4>
                  </div>
                  <ul className="space-y-2">
                    {projectPlan.security.monitoring.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sprint Planning */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Sprint Planning ({projectPlan.sprints.length} Sprints)</h3>
              </div>

              <div className="space-y-4">
                {projectPlan.sprints.map((sprint) => (
                  <div key={sprint.number} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg text-gray-900">Sprint {sprint.number}</h4>
                      <span className="text-sm text-gray-600 font-medium">{sprint.duration}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Goals</h5>
                        <ul className="space-y-1">
                          {sprint.goals.map((goal, idx) => (
                            <li key={idx} className="text-sm text-gray-600">• {goal}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">User Stories</h5>
                        <ul className="space-y-1">
                          {sprint.stories.map((story, idx) => (
                            <li key={idx} className="text-sm text-gray-600">• {story}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Deliverables</h5>
                        <ul className="space-y-1">
                          {sprint.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="text-sm text-gray-600">• {deliverable}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <h3 className="text-2xl font-bold text-gray-900">Risk Assessment & Mitigation</h3>
              </div>

              <div className="space-y-3">
                {projectPlan.riskAssessment.map((risk, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-bold text-gray-500 uppercase">{risk.category}</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded border ${getSeverityColor(risk.severity)}`}>
                            {risk.severity}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">{risk.risk}</h4>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Mitigation:</span> {risk.mitigation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <TestTube className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Quality Assurance Metrics</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Code Review Policy</h4>
                  <p className="text-sm text-gray-700">{projectPlan.qualityMetrics.codeReview}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Test Coverage</h4>
                  <p className="text-sm text-gray-700">{projectPlan.qualityMetrics.testCoverage}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Performance Targets</h4>
                  <ul className="space-y-2">
                    {projectPlan.qualityMetrics.performanceTargets.map((target, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Documentation Requirements</h4>
                  <ul className="space-y-2">
                    {projectPlan.qualityMetrics.documentation.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Resource Allocation */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
                <h3 className="text-2xl font-bold text-gray-900">Resource Allocation</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(projectPlan.resourceAllocation).map(([role, count]) => (
                  <div key={role} className="border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{count}</div>
                    <div className="text-sm font-medium text-gray-700 capitalize">
                      {role.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Project Deliverables</h3>
              </div>

              <div className="space-y-4">
                {projectPlan.deliverables.map((phase, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg text-gray-900">{phase.phase}</h4>
                      <span className="text-sm font-medium text-gray-600">{phase.timeline}</span>
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>Enterprise Project Planner | Professional Software Development Company</p>
            <p className="mt-1">10+ Years Serving Forbes-Listed Clients | Agile/Scrum Methodology</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
