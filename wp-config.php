<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'tussin' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'X?d*.&MddL.^n5`4i%yj)]_{s4Nb>Z}:U@-{J3@jO@y;|E^B1Ug!+W6)T126AxgA' );
define( 'SECURE_AUTH_KEY',  '&DNuvxf)1_OKEVtYri}=UlZ{fszFY0- 4Fq(IkA9+Z>;&$SY#U+znGb.ESDX d8c' );
define( 'LOGGED_IN_KEY',    'uBC!{q-s[Ua{kjvW6/]I&tR_fHJpyk=5X+zjHSSM.]Ia1Fhl!fnIwPZZa4GK`FrM' );
define( 'NONCE_KEY',        '`d&h;^ML!|iru#o6{mF3$J@X*}jCG(P*)i>Pxw^My^k7a9G%:s5 [gL{Hv`>wRCX' );
define( 'AUTH_SALT',        'Vu$A/V0!U+xB9!N;;;X;iq42o)?D{.ta1L0e[IWh=);[ wKHN3*K~P8o;wx^egy5' );
define( 'SECURE_AUTH_SALT', 'z|Bb%d&C2/pSwOFy g mNSbM0PCmwWoH_Cqvx7Ub*<ael_fv!y,$)s@#>I<gB!;<' );
define( 'LOGGED_IN_SALT',   '9lreQtkc!2u%7$fCLsa>_J0?S:5E18RHI$ma^B@V5sgj/]Q}3Psyc>@yodVbO%9k' );
define( 'NONCE_SALT',       'g?B2b(k <NoXJ3WUI!$K/%;/hDo=KMdN@51$.cSyDaY#pzQZ?CUvm{^Hmb,X&Tl<' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
