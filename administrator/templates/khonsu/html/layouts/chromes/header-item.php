<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  Templates.Khonsu
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 *
 * Module chrome for rendering the module in a submenu
 */

defined('_JEXEC') or die;

$module  = $displayData['module'];

if ($module->content) : ?>
	<div class="header-item header-<?php echo str_replace('_', '-', $module->module); ?>">
		<div class="header-item-content">
			<?php echo $module->content; ?>
		</div>
	</div>
<?php endif; ?>
