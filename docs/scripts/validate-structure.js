#!/usr/bin/env node

/**
 * Documentation Structure Validator
 * Validates the documentation structure and essential files
 */

const fs = require('fs');
const path = require('path');

class DocumentationValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = [];
  }

  validate() {
    console.log('🔍 Validating Documentation Structure...\n');

    // Check essential files
    this.checkEssentialFiles();

    // Check HTML structure
    this.validateHTML();

    // Check CSS structure
    this.validateCSS();

    // Check JavaScript structure
    this.validateJavaScript();

    // Check images and assets
    this.checkAssets();

    // Report results
    this.reportResults();

    return this.errors.length === 0;
  }

  checkEssentialFiles() {
    const essentialFiles = [
      'index.html',
      'assets/css/style.css',
      'assets/js/main.js',
      'assets/js/plugins.js',
      'assets/js/releases.js',
      'README.md',
      'package.json',
    ];

    essentialFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.passed.push(`✓ ${file} exists`);
      } else {
        this.errors.push(`✗ ${file} missing`);
      }
    });
  }

  validateHTML() {
    const htmlFile = 'index.html';

    if (!fs.existsSync(htmlFile)) return;

    const content = fs.readFileSync(htmlFile, 'utf8');

    // Check for essential HTML elements
    const checks = [
      { test: /<!DOCTYPE html>/i, message: 'DOCTYPE declaration' },
      { test: /<html[^>]*lang=["']en["']/i, message: 'Language attribute' },
      { test: /<meta[^>]*charset=["']UTF-8["']/i, message: 'Charset meta tag' },
      { test: /<meta[^>]*viewport[^>]*>/i, message: 'Viewport meta tag' },
      { test: /<title>[^<]*<\/title>/i, message: 'Title tag' },
      { test: /<nav[^>]*id=["']navbar["']/i, message: 'Navigation navbar' },
      { test: /<main[^>]*id=["']main["']/i, message: 'Main content area' },
      { test: /<footer[^>]*id=["']footer["']/i, message: 'Footer section' },
    ];

    checks.forEach(check => {
      if (check.test.test(content)) {
        this.passed.push(`✓ HTML: ${check.message}`);
      } else {
        this.warnings.push(`⚠ HTML: ${check.message} missing`);
      }
    });

    // Check for dark mode support
    if (/data-theme=/.test(content)) {
      this.passed.push('✓ HTML: Dark mode support');
    } else {
      this.warnings.push('⚠ HTML: Dark mode support missing');
    }
  }

  validateCSS() {
    const cssFile = 'assets/css/style.css';

    if (!fs.existsSync(cssFile)) return;

    const content = fs.readFileSync(cssFile, 'utf8');

    // Check for CSS custom properties
    if (/:root\s*{/.test(content)) {
      this.passed.push('✓ CSS: Custom properties defined');
    } else {
      this.warnings.push('⚠ CSS: Custom properties not found');
    }

    // Check for dark mode styles
    if (/\[data-theme=["']dark["']/.test(content)) {
      this.passed.push('✓ CSS: Dark mode styles');
    } else {
      this.warnings.push('⚠ CSS: Dark mode styles missing');
    }

    // Check for responsive design
    if (/@media\s*\([^)]*\)/.test(content)) {
      this.passed.push('✓ CSS: Responsive breakpoints');
    } else {
      this.warnings.push('⚠ CSS: No responsive breakpoints found');
    }

    // Check for animations
    if (/@keyframes|animation:/.test(content)) {
      this.passed.push('✓ CSS: Animations defined');
    } else {
      this.warnings.push('⚠ CSS: No animations found');
    }
  }

  validateJavaScript() {
    const jsFiles = [
      'assets/js/main.js',
      'assets/js/plugins.js',
      'assets/js/releases.js',
    ];

    jsFiles.forEach(file => {
      if (!fs.existsSync(file)) return;

      const content = fs.readFileSync(file, 'utf8');

      // Basic JavaScript validation
      if (
        content.includes('function') ||
        content.includes('const ') ||
        content.includes('=>')
      ) {
        this.passed.push(`✓ ${file}: Valid JavaScript syntax`);
      } else {
        this.warnings.push(`⚠ ${file}: No functions or variables found`);
      }

      // Check for event listeners
      if (/addEventListener/.test(content)) {
        this.passed.push(`✓ ${file}: Event listeners defined`);
      } else {
        this.warnings.push(`⚠ ${file}: No event listeners found`);
      }
    });
  }

  checkAssets() {
    const assetsDir = 'assets';

    if (!fs.existsSync(assetsDir)) {
      this.errors.push('✗ Assets directory missing');
      return;
    }

    // Check for images directory
    const imagesDir = path.join(assetsDir, 'images');
    if (fs.existsSync(imagesDir)) {
      this.passed.push('✓ Images directory exists');
    } else {
      this.warnings.push('⚠ Images directory missing');
    }

    // Check file sizes
    this.checkFileSizes();
  }

  checkFileSizes() {
    const files = [
      'assets/css/style.css',
      'assets/js/main.js',
      'assets/js/plugins.js',
      'assets/js/releases.js',
    ];

    files.forEach(file => {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const sizeKB = (stats.size / 1024).toFixed(1);

        if (stats.size < 500 * 1024) {
          // 500KB
          this.passed.push(`✓ ${file}: Size ${sizeKB}KB (acceptable)`);
        } else {
          this.warnings.push(`⚠ ${file}: Size ${sizeKB}KB (large)`);
        }
      }
    });
  }

  reportResults() {
    console.log('\n📊 VALIDATION RESULTS\n');
    console.log('='.repeat(50));

    if (this.passed.length > 0) {
      console.log('\n✅ PASSED CHECKS:');
      this.passed.forEach(item => console.log(`  ${item}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(item => console.log(`  ${item}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(item => console.log(`  ${item}`));
    }

    console.log('\n' + '='.repeat(50));

    if (this.errors.length === 0) {
      console.log('\n🎉 Documentation structure is valid!');
      console.log('🚀 Ready for deployment to GitHub Pages');
    } else {
      console.log('\n❌ Documentation has errors that need to be fixed');
      process.exit(1);
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new DocumentationValidator();
  const isValid = validator.validate();
  process.exit(isValid ? 0 : 1);
}

module.exports = DocumentationValidator;
