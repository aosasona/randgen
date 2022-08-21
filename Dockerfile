FROM php:8.0-apache

WORKDIR /var/www/html

COPY . .

COPY api.conf /etc/apache2/sites-available/api.conf

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    a2enmod rewrite && \
    a2dissite 000-default && \
    a2ensite api && \
    service apache2 restart

EXPOSE 80

ENTRYPOINT ["bash", "Docker.sh"]