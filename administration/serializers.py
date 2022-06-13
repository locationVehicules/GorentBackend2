from dataclasses import fields
from rest_framework import serializers
from .models import *
from parcking.models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class SignUpSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['username','email','password']
        write_only_fields = ('password',)
        read_only_fields = ('id',)
        

class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            # 12 characters are more than enough.
            file_name = str(uuid.uuid4())[:12]
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
                  'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * username
      * password.
    It will try to authenticate the user with when validated.
    """
    username = serializers.CharField(
        label="Username",
        write_only=True
    )
    password = serializers.CharField(
        label="Password",
        # This will be used when the DRF browsable API is enabled
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        # Take username and password from request
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs['user'] = user
        return attrs

class RenterSerializers(serializers.ModelSerializer):
    class Meta:
        model = Renter
        fields = '__all__'


class DriverSerializers(serializers.ModelSerializer):
    image_id = Base64ImageField(
        max_length=None, use_url=True, required=False
    )
    class Meta:
        model = Driver
        fields = '__all__'

    def create(self, validated_data):
      driver = Driver.objects.create(**validated_data)
      driver.save()
      return driver

class blackListSerializers(serializers.ModelSerializer):
    class Meta:
        model = blackList
        fields = '__all__'


class userBlackListSerializers(serializers.ModelSerializer):
    account = serializers.SerializerMethodField('get_account')

    class Meta:
        model = blackList
        fields = ('id',
                  'user',
                  'motif',
                  'add_date', 'account')

    def get_account(self, user):
        account = Driver.objects.get(id=user.id).user.id
        return account


class EnterepriseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Entereprise
        fields = '__all__'


class OwnerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = '__all__'


class EmployeeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class SalariesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Salaries
        fields = '__all__'


class garage_managerSerializers(serializers.ModelSerializer):
    class Meta:
        model = garage_manager
        fields = '__all__'


class AdminSerializers(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'


class secretarySerializers(serializers.ModelSerializer):
    class Meta:
        model = secretary
        fields = '__all__'


class AgencySerializers(serializers.ModelSerializer):
    class Meta:
        model = Agency
        fields = '__all__'
