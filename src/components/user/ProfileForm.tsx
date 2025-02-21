"use client";

import React, { useState, ChangeEvent } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload } from 'lucide-react';

// Type definitions
type Experience = '0' | '1-2' | '2-5' | '5-9' | '9+';
type Web3Familiarity = 'new' | 'occasional' | 'regular';
type WorkPreference = 'none' | 'freelance' | 'fulltime' | 'internship';

interface SocialLinks {
  discord: string;
  twitter: string;
  github: string;
  linkedin: string;
  telegram: string;
  website: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  socials: SocialLinks;
  workExperience: Experience | '';
  web3Familiarity: Web3Familiarity | '';
  workPreference: WorkPreference | '';
  currentEmployer: string;
  location: string;
}

interface ExperienceOption {
  value: Experience;
  label: string;
}

interface SocialPlatform {
  platform: keyof SocialLinks;
  prefix: string;
}

interface SkillButtonProps {
  skill: string;
  selected: boolean;
  onClick: () => void;
}

// Skill categories type
type SkillCategories = {
  [key: string]: string[];
};

// Constants
const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  username: '',
  bio: '',
  socials: {
    discord: '',
    twitter: '',
    github: '',
    linkedin: '',
    telegram: '',
    website: ''
  },
  workExperience: '',
  web3Familiarity: '',
  workPreference: '',
  currentEmployer: '',
  location: ''
};

const MAX_BIO_LENGTH = 180;

// Utility function to create experience options
const createExperienceOptions = (): ExperienceOption[] => [
  { value: '0', label: '0 Years' },
  { value: '1-2', label: '<2 Years' },
  { value: '2-5', label: '2 to 5 Years' },
  { value: '5-9', label: '5 to 9 Years' },
  { value: '9+', label: '>9 Years' }
];

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { platform: 'discord', prefix: '' },
  { platform: 'twitter', prefix: 'x.com/' },
  { platform: 'github', prefix: 'github.com/' },
  { platform: 'linkedin', prefix: 'linkedin.com/in/' },
  { platform: 'telegram', prefix: 't.me/' },
  { platform: 'website', prefix: 'https://' }
];

const SKILL_CATEGORIES: SkillCategories = {
  'Frontend Development': ['React', 'Angular', 'Vue', 'SvelteJS', 'SolidJS'],
  'Backend Development': ['Node.js', 'Python', 'Java', 'C++', 'TypeScript'],
  'Database': ['MySQL', 'PostgreSQL', 'MongoDB'],
  'Blockchain': ['Solidity'],
  'Mobile': ['React Native'],
  'Community': ['Community Manager', 'Discord Moderator'],
  'Content': ['Research', 'Writing', 'Product Feedback'],
  'Management': ['Operations']
};

// Skill button component
const SkillButton: React.FC<SkillButtonProps> = ({ 
  skill, 
  selected, 
  onClick 
}) => (
  <Button
    type="button"
    variant={selected ? "default" : "outline"}
    className="m-1"
    onClick={onClick}
  >
    {skill}
  </Button>
);

// Main profile form component
const ProfileForm: React.FC = () => {
  // State management
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Type-safe handlers
  const handleChange = <K extends keyof FormData>(
    field: K, 
    value: FormData[K]
  ): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialChange = (
    platform: keyof SocialLinks,
    value: string
  ): void => {
    setFormData(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  const handleSkillToggle = (skill: string): void => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ): void => {
    handleChange(field, e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
          <CardDescription>
            Update your profile information and preferences
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Personal Information Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            
            {/* Profile Picture Upload */}
            <div className="space-y-4">
              <Label>Profile Picture</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <Button variant="outline">Choose or drag and drop media</Button>
                  <p className="text-sm text-gray-500 mt-2">Maximum size 5 MB</p>
                </div>
              </div>
            </div>

            {/* Basic Information Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input 
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleTextChange(e, 'firstName')}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input 
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleTextChange(e, 'lastName')}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Username</Label>
                <Input 
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => handleTextChange(e, 'username')}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Bio</Label>
                <div className="relative">
                  <Textarea 
                    placeholder="Tell us about yourself"
                    maxLength={MAX_BIO_LENGTH}
                    value={formData.bio}
                    onChange={(e) => handleTextChange(e, 'bio')}
                    className="resize-none"
                  />
                  <span className="text-sm text-gray-500 absolute right-2 bottom-2">
                    {MAX_BIO_LENGTH - formData.bio.length} characters left
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Social Links Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Social Links</h2>
            {SOCIAL_PLATFORMS.map(({ platform, prefix }) => (
              <div key={platform} className="space-y-2">
                <Label className="capitalize">{platform}</Label>
                <div className="flex">
                  {prefix && (
                    <span className="bg-muted px-3 py-2 rounded-l-md border-y border-l text-muted-foreground">
                      {prefix}
                    </span>
                  )}
                  <Input 
                    className={prefix ? "rounded-l-none" : ""}
                    placeholder={`Enter your ${platform} ${platform === 'website' ? 'URL' : 'username'}`}
                    value={formData.socials[platform]}
                    onChange={(e) => handleSocialChange(platform, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Work Experience Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Work Experience</Label>
                <Select 
                  onValueChange={(value: Experience) => handleChange('workExperience', value)}
                  value={formData.workExperience}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {createExperienceOptions().map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Web3 Familiarity</Label>
                <Select 
                  onValueChange={(value: Web3Familiarity) => handleChange('web3Familiarity', value)}
                  value={formData.web3Familiarity}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your familiarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New to crypto</SelectItem>
                    <SelectItem value="occasional">Occasionally contributing</SelectItem>
                    <SelectItem value="regular">Contributing regularly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Current Employer</Label>
                <Input 
                  placeholder="Enter your current employer"
                  value={formData.currentEmployer}
                  onChange={(e) => handleTextChange(e, 'currentEmployer')}
                />
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Skills</h2>
            <Alert>
              <AlertDescription>
                We will send email notifications of new listings for your selected skills
              </AlertDescription>
            </Alert>
            
            <div className="space-y-6">
              {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
                <div key={category} className="space-y-2">
                  <Label>{category}</Label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <SkillButton
                        key={skill}
                        skill={skill}
                        selected={selectedSkills.includes(skill)}
                        onClick={() => handleSkillToggle(skill)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </CardContent>

        <CardFooter className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            className="w-32"
            onClick={() => setFormData(INITIAL_FORM_DATA)}
          >
            Cancel
          </Button>
          <Button className="w-32">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileForm;