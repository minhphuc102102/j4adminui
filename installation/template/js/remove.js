/**
 * @package     Joomla.Installation
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
// Init on dom content loaded event
var url = Joomla.getOptions('system.installation').url ? Joomla.getOptions('system.installation').url.replace(/&amp;/g, '&') : 'index.php';

if (document.getElementById('installAddFeatures')) {
  document.getElementById('installAddFeatures').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('installLanguages').classList.add('active');
    document.getElementById('installCongrat').classList.remove('active');
    document.getElementById('installFinal').classList.remove('active');
    document.getElementById('installRecommended').classList.remove('active');
  })
}

if (document.getElementById('skipLanguages')) {
	document.getElementById('skipLanguages').addEventListener('click', function(e) {
		e.preventDefault();
		document.getElementById('installFinal').classList.add('active');
		document.getElementById('installRecommended').classList.add('active');
		document.getElementById('installLanguages').classList.remove('active');
	})
}

if (document.getElementById('removeInstallationFolder')) {
	document.getElementById('removeInstallationFolder')
		.addEventListener('click', function (e) {
			e.preventDefault();
			let confirm = window.confirm(Joomla.Text._('INSTL_REMOVE_INST_FOLDER'));
			if (confirm) {
				Joomla.request({
					method: "POST",
					url: Joomla.installationBaseUrl + '?task=installation.removeFolder&format=json',
					perform: true,
					token: true,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					onSuccess: function () {
						const removeFolder = document.getElementById('removeInstallationFolder');
						const afterRemoveMsg = document.getElementById('removeFolderMsg');
						const customiseInstall = document.getElementById('customize-installation');

						// Remove the Remove Installation Folder button
						if (removeFolder) {
							removeFolder.parentNode.removeChild(removeFolder);
						}

						// Remove the customize installation button
						if (customiseInstall) {
							customiseInstall.parentNode.removeChild(customiseInstall);
						}

						// Display Installation Folder Removed message
						if (afterRemoveMsg) {
							afterRemoveMsg.classList.remove('d-none');
						}

					},
					onError: function (xhr) {
						Joomla.renderMessages({ error: [xhr] }, '#system-message-container');
					}
					}
				);
			}
		}
		);
}

if (document.getElementById('installLanguagesButton')) {
	document.getElementById('installLanguagesButton').addEventListener('click', function(e) {
		e.preventDefault();
		var form = document.getElementById('languagesForm');
		if (form) {
			// Install the extra languages
			if (Joomla.install(['languages'], form)) {
				document.getElementById('installLanguages').classList.remove('active');
				document.getElementById('installFinal').classList.add('active');
			}
		}
	})
}

if (document.getElementById('installSampleDataButton')) {
	document.getElementById('installSampleDataButton').addEventListener('click', function(e) {
		e.preventDefault();
		var form = document.getElementById('sampleDataForm');
		if (form) {
			// Install the extra languages
			Joomla.install(['sample'], form);

			document.getElementById('installSampleData').classList.toggle('active');
			document.getElementById('installSampleData').style.display = 'none';
			document.getElementById('installFinal').classList.add('active');
		}
	})
}

if (document.getElementById('j-install-check-all-lang')) {
	document.getElementById('j-install-check-all-lang').addEventListener('change', function(e){
		const checkboxes = [...document.querySelectorAll('#j-lang-checkboxes input[type="checkbox"]')];
		checkboxes.forEach(box => {
			if (e.target.checked) {
				box.checked = true;
			} else {
				box.checked = false;
			}
		});
	});
}
