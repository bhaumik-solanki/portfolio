#!/usr/bin/env python3
"""
BTech CSE Portfolio Backend API Test Suite
Tests all portfolio API endpoints for functionality, data validation, and error handling.
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any, List

# Backend URL from frontend/.env
BACKEND_URL = "https://b951b7cf-7236-4c0b-96cc-6899a045a2f1.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        self.session = requests.Session()
        
    def log_test(self, test_name: str, passed: bool, message: str, details: Dict = None):
        """Log test results"""
        result = {
            "test": test_name,
            "passed": passed,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {json.dumps(details, indent=2)}")
        print()

    def test_api_health(self):
        """Test if API is accessible"""
        try:
            response = self.session.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                self.log_test("API Health Check", True, "API is accessible", {"response": data})
                return True
            else:
                self.log_test("API Health Check", False, f"API returned status {response.status_code}")
                return False
        except Exception as e:
            self.log_test("API Health Check", False, f"Failed to connect to API: {str(e)}")
            return False

    def test_portfolio_init(self):
        """Test portfolio initialization endpoint"""
        try:
            response = self.session.post(f"{self.base_url}/portfolio/init")
            
            if response.status_code == 200:
                data = response.json()
                expected_message = "Portfolio initialized successfully"
                already_exists = "Portfolio already initialized"
                
                if data.get("message") in [expected_message, already_exists]:
                    self.log_test("Portfolio Initialization", True, 
                                f"Portfolio init successful: {data.get('message')}", 
                                {"response": data})
                    return True
                else:
                    self.log_test("Portfolio Initialization", False, 
                                f"Unexpected response message: {data.get('message')}")
                    return False
            else:
                self.log_test("Portfolio Initialization", False, 
                            f"Init failed with status {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Portfolio Initialization", False, f"Exception: {str(e)}")
            return False

    def test_portfolio_retrieval(self):
        """Test portfolio data retrieval"""
        try:
            response = self.session.get(f"{self.base_url}/portfolio")
            
            if response.status_code == 200:
                data = response.json()
                
                # Validate required fields
                required_fields = ["personal", "projects", "experience", "education", 
                                 "skills", "achievements", "certifications"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("Portfolio Data Retrieval", False, 
                                f"Missing required fields: {missing_fields}")
                    return False
                
                # Validate personal info
                personal = data.get("personal", {})
                personal_required = ["name", "title", "email", "phone", "location", 
                                   "linkedin", "github", "portfolio", "bio"]
                missing_personal = [field for field in personal_required if field not in personal]
                
                if missing_personal:
                    self.log_test("Portfolio Data Retrieval", False, 
                                f"Missing personal info fields: {missing_personal}")
                    return False
                
                # Validate projects structure
                projects = data.get("projects", [])
                if not isinstance(projects, list) or len(projects) == 0:
                    self.log_test("Portfolio Data Retrieval", False, 
                                "Projects should be a non-empty list")
                    return False
                
                # Check first project structure
                project = projects[0]
                project_required = ["title", "description", "image", "technologies", 
                                  "githubLink", "category"]
                missing_project_fields = [field for field in project_required if field not in project]
                
                if missing_project_fields:
                    self.log_test("Portfolio Data Retrieval", False, 
                                f"Missing project fields: {missing_project_fields}")
                    return False
                
                # Validate skills structure
                skills = data.get("skills", {})
                skills_required = ["programming", "frontend", "backend", "databases", "tools"]
                missing_skills = [field for field in skills_required if field not in skills]
                
                if missing_skills:
                    self.log_test("Portfolio Data Retrieval", False, 
                                f"Missing skills categories: {missing_skills}")
                    return False
                
                self.log_test("Portfolio Data Retrieval", True, 
                            "Portfolio data structure is valid", 
                            {
                                "projects_count": len(projects),
                                "experience_count": len(data.get("experience", [])),
                                "achievements_count": len(data.get("achievements", [])),
                                "certifications_count": len(data.get("certifications", []))
                            })
                return True
                
            elif response.status_code == 404:
                self.log_test("Portfolio Data Retrieval", False, 
                            "Portfolio not found - may need initialization")
                return False
            else:
                self.log_test("Portfolio Data Retrieval", False, 
                            f"Failed with status {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Portfolio Data Retrieval", False, f"Exception: {str(e)}")
            return False

    def test_contact_submission(self):
        """Test contact form submission"""
        try:
            # Test data
            contact_data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "subject": "Portfolio Inquiry",
                "message": "I'm interested in discussing potential collaboration opportunities. Your portfolio showcases impressive projects!"
            }
            
            response = self.session.post(f"{self.base_url}/contact", json=contact_data)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "id" in data:
                    self.log_test("Contact Form Submission", True, 
                                "Contact message submitted successfully", 
                                {"response": data})
                    return True
                else:
                    self.log_test("Contact Form Submission", False, 
                                "Response missing required fields")
                    return False
            else:
                self.log_test("Contact Form Submission", False, 
                            f"Submission failed with status {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception: {str(e)}")
            return False

    def test_contact_validation(self):
        """Test contact form validation with invalid data"""
        try:
            # Test with missing required fields
            invalid_data = {
                "name": "John Doe",
                "email": "invalid-email",  # Invalid email format
                "subject": "",  # Empty subject
                # Missing message field
            }
            
            response = self.session.post(f"{self.base_url}/contact", json=invalid_data)
            
            # Should return validation error (422 for Pydantic validation)
            if response.status_code == 422:
                self.log_test("Contact Form Validation", True, 
                            "Validation correctly rejected invalid data")
                return True
            elif response.status_code == 200:
                self.log_test("Contact Form Validation", False, 
                            "API accepted invalid data - validation may be missing")
                return False
            else:
                self.log_test("Contact Form Validation", False, 
                            f"Unexpected status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form Validation", False, f"Exception: {str(e)}")
            return False

    def test_contact_retrieval(self):
        """Test contact messages retrieval (admin endpoint)"""
        try:
            response = self.session.get(f"{self.base_url}/contact")
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    # Check structure of messages if any exist
                    if len(data) > 0:
                        message = data[0]
                        required_fields = ["id", "name", "email", "subject", "message", 
                                         "isRead", "createdAt"]
                        missing_fields = [field for field in required_fields if field not in message]
                        
                        if missing_fields:
                            self.log_test("Contact Messages Retrieval", False, 
                                        f"Missing message fields: {missing_fields}")
                            return False
                    
                    self.log_test("Contact Messages Retrieval", True, 
                                f"Retrieved {len(data)} contact messages", 
                                {"messages_count": len(data)})
                    return True
                else:
                    self.log_test("Contact Messages Retrieval", False, 
                                "Response should be a list of messages")
                    return False
            else:
                self.log_test("Contact Messages Retrieval", False, 
                            f"Failed with status {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Contact Messages Retrieval", False, f"Exception: {str(e)}")
            return False

    def test_error_handling(self):
        """Test API error handling"""
        try:
            # Test non-existent endpoint
            response = self.session.get(f"{self.base_url}/nonexistent")
            
            if response.status_code == 404:
                self.log_test("Error Handling", True, 
                            "API correctly returns 404 for non-existent endpoints")
                return True
            else:
                self.log_test("Error Handling", False, 
                            f"Expected 404, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Error Handling", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all test scenarios"""
        print("=" * 60)
        print("BTech CSE Portfolio Backend API Test Suite")
        print("=" * 60)
        print(f"Testing API at: {self.base_url}")
        print()
        
        # Test sequence
        tests = [
            ("API Health Check", self.test_api_health),
            ("Portfolio Initialization", self.test_portfolio_init),
            ("Portfolio Data Retrieval", self.test_portfolio_retrieval),
            ("Contact Form Submission", self.test_contact_submission),
            ("Contact Form Validation", self.test_contact_validation),
            ("Contact Messages Retrieval", self.test_contact_retrieval),
            ("Error Handling", self.test_error_handling)
        ]
        
        passed_tests = 0
        total_tests = len(tests)
        
        for test_name, test_func in tests:
            try:
                if test_func():
                    passed_tests += 1
            except Exception as e:
                self.log_test(test_name, False, f"Test execution failed: {str(e)}")
        
        # Summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {total_tests - passed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        print()
        
        # Failed tests details
        failed_tests = [test for test in self.test_results if not test["passed"]]
        if failed_tests:
            print("FAILED TESTS:")
            for test in failed_tests:
                print(f"❌ {test['test']}: {test['message']}")
        else:
            print("🎉 All tests passed!")
        
        print("=" * 60)
        
        return passed_tests == total_tests

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)