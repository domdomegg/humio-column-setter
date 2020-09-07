rm -f chrome-extension.zip
zip -r chrome-extension.zip . -x "img/*.svg" -x "img/promo.png" -x ".git*" -x "*.md" -x "*.sh"