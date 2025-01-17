/**
 * Compatibility and support for USOF in WPBakery Page Builder.
 */
! function( $, undefined ) {
	"use strict";

	// Private variables that are used only in the context of this function, it is necessary to optimize the code
	var _window = window;

	// Сheck the presence of the object
	_window.$usof = _window.$usof || {};

	// Functionality for $usof.field compatibility in WPBakery.
	if ( $.isFunction( $usof.field ) ) {
		/**
		 * Get the related field.
		 *
		 * @return {$usof.field|undefined} Returns the related field object, otherwise undefined.
		 */
		$usof.field.prototype.getRelatedField = function() {
			var self = this;

			var relatedOn = $ush.toString( self.relatedOn );
			if ( ! relatedOn ) {
				return; // undefined
			}

			// WPBakery, the fields in the group contain a prefix of the group name, so we adjust it for compatibility.
			// relatedOn: `{group_name}|{param_name}` to `{group_name}_{param_name}`
			var $field = self.$row.closest('.vc_shortcode-param'),
				$relatedField = $( '[data-name="' + ( relatedOn.replace( '|', '_' ) ) + '"]:first', $field.parent() ),
				usofField = $relatedField.data( 'usofField' );
			//  Set name without a group? relatedOn: {group_name}|{param_name}
			if ( relatedOn.indexOf( '|' ) > -1 ) {
				usofField.name = relatedOn.split( '|' )[ /* param_name */ 1] || relatedOn;
			}

			return usofField;
		};
	}

	// Init usof fields
	$( '.vc_ui-panel-window.vc_active [data-name]' ).each( function() {
		var $field = $( this );
		if ( $field.data( 'usofField' ) ) {
			return;
		}
		var usofField = $field.usofField();
		if ( usofField instanceof $usof.field ) {
			// Exclude `design_options` since initialization comes from USOF controls
			if ( usofField.$input.closest( '.type_design_options' ).length ) {
				return;
			}
			usofField.trigger( 'beforeShow' );
			usofField.setValue( usofField.$input.val() );

			// For related fields, we fire an event to apply the value from this field.
			// Note: In $usof.field['autocomplete'] loads the default items.
			if ( usofField.relatedOn ) {
				var relatedField = usofField.getRelatedField();
				if ( relatedField instanceof $usof.field ) {
					relatedField.trigger( 'change' );
				}
			}
		}
	} );

}( jQuery );
