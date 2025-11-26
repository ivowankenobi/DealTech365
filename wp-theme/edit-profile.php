<?php
/**
 * Template Name: Edit Profile
 */

if ( ! is_user_logged_in() ) {
    wp_safe_redirect( wp_login_url( get_permalink() ) );
    exit;
}

if ( ! function_exists( 'bftech_render_profile_form' ) ) {
    function bftech_render_profile_form() {
        $current_user = wp_get_current_user();
        $success      = false;
        $errors       = array();

        if ( isset( $_POST['bftech_profile_nonce'] ) && wp_verify_nonce( wp_unslash( $_POST['bftech_profile_nonce'] ), 'bftech_update_profile' ) ) {
            $user_id          = get_current_user_id();
            $display_name     = sanitize_text_field( wp_unslash( $_POST['display_name'] ?? '' ) );
            $email            = sanitize_email( wp_unslash( $_POST['user_email'] ?? '' ) );
            $first_name       = sanitize_text_field( wp_unslash( $_POST['first_name'] ?? '' ) );
            $last_name        = sanitize_text_field( wp_unslash( $_POST['last_name'] ?? '' ) );
            $description      = sanitize_textarea_field( wp_unslash( $_POST['description'] ?? '' ) );
            $newsletter_optin = isset( $_POST['newsletter_optin'] ) ? 1 : 0;

            if ( ! is_email( $email ) ) {
                $errors[] = __( 'Introduce un correo válido.', 'bftech' );
            } elseif ( email_exists( $email ) && email_exists( $email ) !== $user_id ) {
                $errors[] = __( 'El correo ya está en uso.', 'bftech' );
            }

            if ( empty( $errors ) ) {
                $updated = wp_update_user(
                    array(
                        'ID'           => $user_id,
                        'display_name' => $display_name,
                        'user_email'   => $email,
                        'first_name'   => $first_name,
                        'last_name'    => $last_name,
                        'description'  => $description,
                    )
                );

                if ( is_wp_error( $updated ) ) {
                    $errors[] = $updated->get_error_message();
                } else {
                    update_user_meta( $user_id, 'bftech_newsletter_optin', $newsletter_optin );
                    $success = true;
                }
            }
        }

        $current_user = wp_get_current_user();
        ?>
        <?php if ( $success ) : ?>
            <p class="profile-message success"><?php esc_html_e( 'Perfil actualizado correctamente.', 'bftech' ); ?></p>
        <?php elseif ( ! empty( $errors ) ) : ?>
            <div class="profile-message error">
                <?php foreach ( $errors as $error ) : ?>
                    <p><?php echo esc_html( $error ); ?></p>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <form class="profile-form" method="post">
            <?php wp_nonce_field( 'bftech_update_profile', 'bftech_profile_nonce' ); ?>
            <label for="display_name"><?php esc_html_e( 'Nombre visible', 'bftech' ); ?></label>
            <input type="text" name="display_name" id="display_name" value="<?php echo esc_attr( $current_user->display_name ); ?>" required>

            <label for="first_name"><?php esc_html_e( 'Nombre', 'bftech' ); ?></label>
            <input type="text" name="first_name" id="first_name" value="<?php echo esc_attr( $current_user->first_name ); ?>">

            <label for="last_name"><?php esc_html_e( 'Apellido', 'bftech' ); ?></label>
            <input type="text" name="last_name" id="last_name" value="<?php echo esc_attr( $current_user->last_name ); ?>">

            <label for="user_email"><?php esc_html_e( 'Correo', 'bftech' ); ?></label>
            <input type="email" name="user_email" id="user_email" value="<?php echo esc_attr( $current_user->user_email ); ?>" required>

            <label for="description"><?php esc_html_e( 'Bio', 'bftech' ); ?></label>
            <textarea name="description" id="description"><?php echo esc_textarea( $current_user->description ); ?></textarea>

            <div class="checkbox-row">
                <input type="checkbox" name="newsletter_optin" id="newsletter_optin" value="1" <?php checked( get_user_meta( $current_user->ID, 'bftech_newsletter_optin', true ), 1 ); ?>>
                <label for="newsletter_optin"><?php esc_html_e( 'Quiero recibir alertas de ofertas y newsletter', 'bftech' ); ?></label>
            </div>

            <button type="submit" class="btn primary"><?php esc_html_e( 'Guardar cambios', 'bftech' ); ?></button>
        </form>
        <?php
    }
}

get_header();
?>

<main>
  <section class="edit-profile">
    <h1><?php esc_html_e( 'Editar mi perfil', 'bftech' ); ?></h1>
    <p><?php esc_html_e( 'Ajusta tus datos públicos y activa las alertas de Black Friday Tech.', 'bftech' ); ?></p>
    <?php bftech_render_profile_form(); ?>
  </section>
</main>

<?php
get_footer();
