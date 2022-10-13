DEV_X86=dev_x86
DEV_ARM=dev_arm
BUILD_ARM=build_arm

dev-x86:
	@mkdir -p $(DEV_X86)
	cmake -B "$(DEV_X86)" \
		-DCMAKE_BUILD_TYPE=Debug \
		-DCMAKE_BUILD_PLATFORM=x86
	cmake --build $(DEV_X86)

dev-arm:
	@mkdir -p $(DEV_ARM)
	cmake -B "$(DEV_ARM)" \
		-DCMAKE_BUILD_TYPE=Debug \
		-DCMAKE_BUILD_PLATFORM=arm \
		-DCMAKE_C_COMPILER=/usr/local/arm/gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabihf/bin/arm-linux-gnueabihf-gcc \
		-DCMAKE_CXX_COMPILER=/usr/local/arm/gcc-linaro-4.9.4-2017.01-x86_64_arm-linux-gnueabihf/bin/arm-linux-gnueabihf-g++ \
		-DCMAKE_CURL_LIB=/home/sxs/curl/build_arm/lib/libcurl.so \
		-DCMAKE_CURL_INCLUDE_DIRS=/home/sxs/curl/build_arm/include \
		-DCMAKE_SSL_LIB=/home/sxs/openssl-master/openssl-master/build_arm/lib/libssl.so.3 \
		-DCMAKE_CRYPTO_LIB=/home/sxs/openssl-master/openssl-master/build_arm/lib/libcrypto.so.3
	cmake --build $(DEV_ARM)

build-arm:
	@mkdir -p build-arm
	cmake -B "$(BUILD_ARM)"