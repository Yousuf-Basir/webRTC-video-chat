<div class="shared_images_root">
    <h4>Shared images</h4>

    <div class="shared_images_body">
        <div class="image_placeholder"></div>
        <div class="image_placeholder"></div>
        <div class="image_placeholder"></div>
    </div>
</div>

<style>
    .shared_images_root {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 10px 10px;
    }

    .shared_images_root h4 {
        font-size: 1.1rem;
        font-weight: 500;
        color: #1c64f1;
    }

    .shared_images_body {
        display: flex;
        flex-direction: row;
        gap: 10px;
        flex-wrap: wrap;
    }

    .image_placeholder {
        width: calc(var(--share_root_height) - 54px);
        height: calc(var(--share_root_height) - 54px);
        background-color: #e3e7f0;
        border-radius: 10px;
    }
</style>