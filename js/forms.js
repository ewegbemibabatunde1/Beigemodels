/**
 * BEIGE MODEL MANAGEMENT — INTERACTIVE FORMS & TOOLS
 * Powers talent selection chips, polaroid image previewers,
 * height converter, live Lagos clock, and WhatsApp brief generation.
 */

(function () {
  'use strict';

  // 1. Model Selection Chips (book/index.html)
  function initModelChips() {
    var chips = document.querySelectorAll('.model-chip');
    var select = document.getElementById('requestedModel');
    if (!chips.length || !select) return;

    // Check URL query param or hash for pre-selected model (e.g. ?model=Aisha)
    var urlParams = new URLSearchParams(window.location.search);
    var preselected = urlParams.get('model') || window.location.hash.replace('#', '');

    function selectModel(modelName) {
      chips.forEach(function (chip) {
        if (chip.getAttribute('data-model').toLowerCase() === modelName.toLowerCase()) {
          chip.classList.add('selected');
        } else {
          chip.classList.remove('selected');
        }
      });
      // sync select element
      for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value.toLowerCase().indexOf(modelName.toLowerCase()) !== -1) {
          select.selectedIndex = i;
          break;
        }
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var model = chip.getAttribute('data-model');
        selectModel(model);
      });
    });

    select.addEventListener('change', function () {
      var val = select.value;
      chips.forEach(function (chip) {
        var m = chip.getAttribute('data-model');
        if (val.toLowerCase().indexOf(m.toLowerCase()) !== -1) {
          chip.classList.add('selected');
        } else {
          chip.classList.remove('selected');
        }
      });
    });

    if (preselected) {
      selectModel(preselected);
    }
  }

  // 2. Commercial Booking Handler
  window.handleCommercialBooking = function (e) {
    if (e) e.preventDefault();
    var company = document.getElementById('clientCompany') ? document.getElementById('clientCompany').value.trim() : '';
    var name = document.getElementById('clientName') ? document.getElementById('clientName').value.trim() : '';
    var email = document.getElementById('clientEmail') ? document.getElementById('clientEmail').value.trim() : '';
    var phone = document.getElementById('clientPhone') ? document.getElementById('clientPhone').value.trim() : '';
    var projectType = document.getElementById('projectType') ? document.getElementById('projectType').value : '';
    var talent = document.getElementById('requestedModel') ? document.getElementById('requestedModel').value : '';
    var dates = document.getElementById('shootDates') ? document.getElementById('shootDates').value.trim() : '';
    var location = document.getElementById('shootLocation') ? document.getElementById('shootLocation').value.trim() : '';
    var usage = document.getElementById('usageScope') ? document.getElementById('usageScope').value : '';
    var budget = document.getElementById('budgetBracket') ? document.getElementById('budgetBracket').value : 'Standard Rate Card';
    var notes = document.getElementById('projectNotes') ? document.getElementById('projectNotes').value.trim() || 'None provided' : 'None provided';

    var refNum = 'BMM-' + Math.floor(100000 + Math.random() * 900000);
    var phoneNum = (window.BEIGE_CONFIG && window.BEIGE_CONFIG.whatsappNumber) || '2349077178197';

    var msg = 'BEIGE TALENT BOOKING REQUEST [' + refNum + ']\n' +
              '------------------------------------\n' +
              'Client / Brand: ' + company + '\n' +
              'Contact Name: ' + name + '\n' +
              'Email: ' + email + '\n' +
              'Phone: ' + phone + '\n' +
              'Production Type: ' + projectType + '\n' +
              'Talent Requested: ' + talent + '\n' +
              'Shoot Dates: ' + dates + '\n' +
              'Location: ' + location + '\n' +
              'Usage Scope: ' + usage + '\n' +
              'Budget Bracket: ' + budget + '\n' +
              'Creative Brief: ' + notes + '\n' +
              '------------------------------------\n' +
              'Please confirm talent availability, option holds, and commercial agreement.';

    var encoded = encodeURIComponent(msg);
    window.open('https://wa.me/' + phoneNum + '?text=' + encoded, '_blank', 'noopener,noreferrer');
  };

  // Copy Brief to Clipboard
  window.copyBookingBrief = function () {
    var company = document.getElementById('clientCompany') ? document.getElementById('clientCompany').value.trim() : '';
    var name = document.getElementById('clientName') ? document.getElementById('clientName').value.trim() : '';
    var email = document.getElementById('clientEmail') ? document.getElementById('clientEmail').value.trim() : '';
    var phone = document.getElementById('clientPhone') ? document.getElementById('clientPhone').value.trim() : '';
    var projectType = document.getElementById('projectType') ? document.getElementById('projectType').value : '';
    var talent = document.getElementById('requestedModel') ? document.getElementById('requestedModel').value : '';
    var dates = document.getElementById('shootDates') ? document.getElementById('shootDates').value.trim() : '';
    var location = document.getElementById('shootLocation') ? document.getElementById('shootLocation').value.trim() : '';
    var usage = document.getElementById('usageScope') ? document.getElementById('usageScope').value : '';
    var notes = document.getElementById('projectNotes') ? document.getElementById('projectNotes').value.trim() || 'None provided' : 'None provided';

    var briefText = 'BEIGE TALENT CASTING BRIEF\n' +
                    'Brand: ' + (company || '[Brand Name]') + '\n' +
                    'Contact: ' + (name || '[Name]') + ' (' + (email || '[Email]') + ', ' + (phone || '[Phone]') + ')\n' +
                    'Project: ' + projectType + '\n' +
                    'Talent: ' + talent + '\n' +
                    'Dates: ' + (dates || '[Dates]') + '\n' +
                    'Location: ' + (location || '[City]') + '\n' +
                    'Licensing: ' + usage + '\n' +
                    'Brief: ' + notes;

    navigator.clipboard.writeText(briefText).then(function () {
      var btn = document.getElementById('copyBriefBtn');
      if (btn) {
        var orig = btn.innerHTML;
        btn.innerHTML = '✓ Brief Copied to Clipboard';
        btn.style.backgroundColor = '#101010';
        btn.style.color = '#ffffff';
        setTimeout(function () {
          btn.innerHTML = orig;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 2500);
      }
    }).catch(function () {
      alert('Could not copy automatically. You can send directly via WhatsApp!');
    });
  };

  // 3. Polaroid Upload Previews (apply/index.html)
  function initPolaroidUploader() {
    var polaroidInputs = document.querySelectorAll('.polaroid-file-input');
    if (!polaroidInputs.length) return;

    polaroidInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        var file = input.files && input.files[0];
        if (!file) return;

        var card = input.closest('.polaroid-card');
        var frame = card.querySelector('.polaroid-frame');
        var img = frame.querySelector('img.preview-img');

        if (file.type.match('image.*')) {
          var reader = new FileReader();
          reader.onload = function (e) {
            img.src = e.target.result;
            frame.classList.add('has-image');
            card.classList.add('has-image');
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }

  // 4. Height Converter Tool (apply/index.html)
  window.convertHeightToCm = function () {
    var feetInput = document.getElementById('converterFeet');
    var inchesInput = document.getElementById('converterInches');
    var targetHeight = document.getElementById('applicantHeight');
    if (!feetInput || !inchesInput || !targetHeight) return;

    var feet = parseFloat(feetInput.value) || 0;
    var inches = parseFloat(inchesInput.value) || 0;
    if (feet > 0) {
      var totalInches = (feet * 12) + inches;
      var cm = Math.round(totalInches * 2.54);
      targetHeight.value = cm;
      var feedback = document.getElementById('converterFeedback');
      if (feedback) {
        feedback.textContent = feet + '\'' + inches + '" = ' + cm + ' cm (applied)';
        feedback.style.color = '#ff9fb2';
      }
    }
  };

  // 5. Model Scouting Application Handler (apply/index.html)
  window.handleModelApplication = function (e) {
    if (e) e.preventDefault();
    var name = document.getElementById('applicantName') ? document.getElementById('applicantName').value.trim() : '';
    var age = document.getElementById('applicantAge') ? document.getElementById('applicantAge').value.trim() : '';
    var phone = document.getElementById('applicantPhone') ? document.getElementById('applicantPhone').value.trim() : '';
    var email = document.getElementById('applicantEmail') ? document.getElementById('applicantEmail').value.trim() : '';
    var city = document.getElementById('applicantCity') ? document.getElementById('applicantCity').value.trim() : '';
    var social = document.getElementById('applicantSocial') ? document.getElementById('applicantSocial').value.trim() || 'N/A' : 'N/A';
    var height = document.getElementById('applicantHeight') ? document.getElementById('applicantHeight').value.trim() : '';
    var bust = document.getElementById('applicantBust') ? document.getElementById('applicantBust').value.trim() : '';
    var waist = document.getElementById('applicantWaist') ? document.getElementById('applicantWaist').value.trim() : '';
    var hips = document.getElementById('applicantHips') ? document.getElementById('applicantHips').value.trim() : '';
    var shoe = document.getElementById('applicantShoe') ? document.getElementById('applicantShoe').value.trim() : 'N/A';
    var eyeHair = document.getElementById('applicantFeatures') ? document.getElementById('applicantFeatures').value.trim() : 'Natural';
    var category = document.getElementById('applicantCategory') ? document.getElementById('applicantCategory').value : 'All Divisions';
    var bio = document.getElementById('applicantBio') ? document.getElementById('applicantBio').value.trim() || 'None' : 'None';

    var phoneNum = (window.BEIGE_CONFIG && window.BEIGE_CONFIG.whatsappNumber) || '2349077178197';

    var msg = 'BEIGE MODEL SCOUTING APPLICATION\n' +
              '------------------------------------\n' +
              'Full Name: ' + name + '\n' +
              'Age: ' + age + '\n' +
              'Location: ' + city + '\n' +
              'Phone: ' + phone + '\n' +
              'Email: ' + email + '\n' +
              'Social Handle: ' + social + '\n' +
              'Stats:\n' +
              ' - Height: ' + height + ' cm\n' +
              ' - Bust: ' + bust + ' in\n' +
              ' - Waist: ' + waist + ' in\n' +
              ' - Hips: ' + hips + ' in\n' +
              ' - Shoe: ' + shoe + '\n' +
              ' - Features: ' + eyeHair + '\n' +
              'Division Interest: ' + category + '\n' +
              'About: ' + bio + '\n' +
              '------------------------------------\n' +
              'I am attaching my 4 natural digitals (Headshot, Profile, Waist-Up, Full Length) in this chat.';

    var encoded = encodeURIComponent(msg);
    window.open('https://wa.me/' + phoneNum + '?text=' + encoded, '_blank', 'noopener,noreferrer');
  };

  // 6. Lagos Live Clock (contact/index.html)
  function initLagosClock() {
    var clockElem = document.getElementById('lagosClock');
    if (!clockElem) return;

    function update() {
      // Lagos is West Africa Time (UTC+1, no daylight saving)
      var now = new Date();
      var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      var lagosTime = new Date(utc + (3600000 * 1));
      var hours = lagosTime.getHours();
      var mins = lagosTime.getMinutes();
      var secs = lagosTime.getSeconds();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      var formattedH = hours % 12 || 12;
      var formattedM = mins < 10 ? '0' + mins : mins;
      var formattedS = secs < 10 ? '0' + secs : secs;

      var isOpen = (hours >= 9 && hours < 18);
      var statusText = isOpen ? 'Agency HQ Open (09:00 - 18:00 WAT)' : 'After Hours · WhatsApp Monitored 24/7';

      clockElem.innerHTML = '<span class="dot"></span> ' + formattedH + ':' + formattedM + ':' + formattedS + ' ' + ampm + ' WAT · ' + statusText;
    }

    update();
    setInterval(update, 1000);
  }

  // DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    initModelChips();
    initPolaroidUploader();
    initLagosClock();
  });
})();
