// Supplement the upstream catalog before the NVMe editor is defined.
(() => {
    const translations = {
        zh_CN: {
            'Type 1': '类型 1',
            'Type 2': '类型 2',
            'Type 3': '类型 3',
            '16-bit': '16 位',
            '64-bit': '64 位',
            Model: '型号',
            Controller: '控制器',
            Namespace: '命名空间',
            'NVMe controller': 'NVMe 控制器',
            'Serial number': '序列号',
            'Firmware version': '固件版本',
            'I/O queue pairs': 'I/O 队列对数',
            'MSI-X vectors': 'MSI-X 向量数',
            'Use Intel PCI IDs': '使用 Intel PCI 标识',
            'Controller memory buffer': '控制器内存缓冲区',
            'Legacy CMB behavior': '旧版 CMB 行为',
            'OCP extended SMART log': 'OCP 扩展 SMART 日志',
            'NVM subsystem': 'NVM 子系统',
            'Subsystem NQN suffix': '子系统 NQN 后缀',
            'Controller paths': '控制器路径数',
            'Enable CMB': '启用 CMB',
            'CMB size must be a power of two in MiB.': 'CMB 大小必须为 2 的幂，单位为 MiB。',
            'Multiple controller paths': '启用控制器多路径',
            'Customize Simple Copy limits': '自定义 Simple Copy 限制',
            'Enable metadata': '启用元数据',
            'Enable protection information': '启用数据保护信息',
            'Enable SR-IOV': '启用 SR-IOV',
            'Select a protection type.': '请选择保护信息类型。',
            'Use 0 for automatic allocation or at least 2 queues.':
                '填 0 表示自动分配，或设置至少 2 个队列。',
            'Namespace ID': '命名空间标识',
            'Namespace UUID': '命名空间 UUID',
            'Logical block size': '逻辑块大小',
            'Share across controller paths': '在各控制器路径间共享',
            'Initially detached': '初始不附加',
            'Zoned Namespace (ZNS)': '分区命名空间 (ZNS)',
            'Zone size': '区域大小',
            'Zone capacity': '区域容量',
            'Zone descriptor extension': '区域描述符扩展',
            'Read across zones': '允许跨区域读取',
            'Maximum active zones': '最大活动区域数',
            'Maximum open zones': '最大打开区域数',
            'Metadata bytes per LBA': '每个 LBA 的元数据字节数',
            'Metadata transfer': '元数据传输方式',
            'Protection information': '数据保护信息',
            'Protection placement': '保护信息位置',
            'Protection guard format': '保护校验格式',
            'Flexible Data Placement (FDP)': '灵活数据放置 (FDP)',
            'Reclaim groups': '回收组数',
            'Reclaim unit handles': '回收单元句柄数',
            'Reclaim unit size': '回收单元大小',
            'Namespace handle list': '命名空间句柄列表',
            'Maximum virtual functions': '最大虚拟功能数',
            'Flexible queue resources': '灵活队列资源数',
            'Flexible interrupt resources': '灵活中断资源数',
            'Maximum queues per VF': '每个 VF 的最大队列数',
            'Maximum interrupts per VF': '每个 VF 的最大中断数',
            'Dedicated controller': '独立控制器',
            'Separate metadata': '单独传输元数据',
            'Extended LBA': '扩展 LBA',
            'Last metadata bytes': '元数据末尾',
            'First metadata bytes': '元数据开头',
            'Use printable ASCII characters.': '请使用可打印的 ASCII 字符。',
            'Automatic (disk index + 1)': '自动（磁盘编号 + 1）',
            'Automatic, stable UUID': '自动生成稳定的 UUID',
            'Not set': '不设置',
            'Automatic, unique per VM and controller': '自动生成，每台虚拟机的每个控制器唯一',
            'QEMU version': 'QEMU 版本',
            'Disk ID': '磁盘标识',
            'Automatic, or e.g. 0;8-15': '自动，或填写如 0;8-15',
            'Invalid NVMe identifier or handle list.': 'NVMe 标识或句柄列表格式无效。',
            'Must be a multiple of 64 bytes.': '必须为 64 字节的整数倍。',
            'Metadata and protection': '元数据与数据保护',
            'SR-IOV (experimental)': 'SR-IOV（实验性）',
            'Leave fields empty to use the displayed defaults. Feature switches supply the parameters needed to enable the feature. Select an existing disk controller to add a namespace; configure controller settings on its owning disk. Multiple paths share one subsystem; private namespaces attach only to the primary path. Model and firmware overrides require QEMU support. NVMe device changes require a shutdown; live migration, RAM snapshots and hibernation are unavailable.':
                '留空时使用显示的默认值，功能开关会生成启用所需的参数。选择已有磁盘的控制器可添加命名空间；控制器参数在其所属磁盘上设置。多条路径共享一个子系统，私有命名空间仅附加到主路径。自定义型号和固件版本需要 QEMU 支持。修改 NVMe 设备需要关闭虚拟机；不支持在线迁移、包含内存的快照和休眠。',
            'With Linux native NVMe multipath, nvme0n1 is the namespace access device and nvme0c0n1 is a controller path, which can appear in logs even with one path. In nvme0c0n1, the first 0 identifies the subsystem, c0 the controller path, and n1 the namespace device index; this index can differ from NSID. Normally use /dev/nvme0n1 or its partitions for partitioning, formatting and mounting.':
                '使用 Linux 原生 NVMe 多路径时，nvme0n1 是命名空间的统一访问入口，nvme0c0n1 是具体控制器路径；即使只有一条路径，日志中也可能显示后者。nvme0c0n1 中，第一个 0 为子系统编号，c0 为控制器路径编号，n1 为命名空间设备编号，该编号可能与 NSID 不同。分区、格式化和挂载通常使用 /dev/nvme0n1 或其分区。',
            'ZNS requires sequential writes and a guest filesystem with zoned-device support, such as Btrfs in zoned mode. Standard GPT partitioning and ext4 formatting can fail with I/O errors; leave ZNS disabled for ordinary disks. This QEMU emulation resets zone write pointers and state on cold starts, so existing filesystem data may become inaccessible; use it for testing. A zone capacity of 0 uses the zone size; a limit of 0 is unlimited or follows the active limit. ZNS and FDP cannot be combined.':
                'ZNS 要求按区域顺序写入，来宾文件系统需支持 ZNS，例如 Btrfs 的 zoned 模式。常规 GPT 分区和 ext4 格式化可能报 I/O 错误；普通磁盘请保持 ZNS 关闭。当前 QEMU 模拟器冷启动时会重置区域写指针和状态，已有文件系统数据可能无法访问，请用于测试。区域容量为 0 时使用区域大小；数量限制为 0 时不限制，或跟随活动区域限制。ZNS 不能与 FDP 同时使用。',
            'Metadata and protection are disabled by default. When enabled, blank fields use 8 metadata bytes and protection type 1; 64-bit guards use 16 metadata bytes. Metadata consumes backing image capacity and prevents resizing. Changing LBA size or metadata reinterprets existing image data; it does not convert the image.':
                '元数据和数据保护默认关闭。启用后留空时使用 8 字节元数据和类型 1 保护；64 位校验使用 16 字节元数据。元数据会占用后端镜像容量，并使镜像无法调整大小。修改 LBA 大小或元数据配置会改变已有镜像数据的解释方式，不会转换镜像。',
            'FDP is disabled by default. When enabled, the subsystem uses 1 reclaim group, 16 handles and 96 MiB reclaim units unless overridden. Namespace handle lists use semicolons and ranges. Namespaces sharing a reclaim unit handle must use the same LBA and metadata format. Reclaim unit size must be a multiple of every namespace LBA size.':
                'FDP 默认关闭。启用后默认使用 1 个回收组、16 个句柄和 96 MiB 回收单元。命名空间句柄列表使用分号分隔，支持范围。共用回收单元句柄的命名空间必须使用相同的 LBA 与元数据格式。回收单元大小必须是每个命名空间 LBA 大小的整数倍。',
            'SR-IOV is disabled by default. When enabled, an empty VF count uses 1 VF. It requires Q35 or aarch64 and a single controller path. Empty resources use two queues and one interrupt per VF, with per-VF limits derived from the pool. Leave resources for the primary controller. Provision VFs from the guest using nvme-cli.':
                'SR-IOV 默认关闭，启用后 VF 数量留空时使用 1 个 VF。需要 Q35 或 aarch64，且控制器只能有一条路径。资源留空时，每个 VF 分配两个队列和一个中断，每个 VF 的上限由资源池计算。需要为主控制器保留资源。在来宾中使用 nvme-cli 配置 VF。',
            'Usage and precautions': '使用方法与注意事项',
            'Automatic (QEMU default)': '自动（QEMU 默认值）',
            'QEMU NVMe documentation': 'QEMU NVMe 文档',
            'The examples target Linux guests. Install nvme-cli and the other tools shown, then run commands as root. Replace example device paths and values in angle brackets with those reported by that guest. Command names and supported features depend on the guest kernel and nvme-cli version; check nvme help when needed.':
                '示例以 Linux 来宾为例。请安装 nvme-cli 和示例中所需的其他工具，再以 root 执行命令。请按实际设备替换示例路径与尖括号中的值。命令名称和可用功能取决于来宾内核及 nvme-cli 版本，必要时使用 nvme help 查看。',
            'Everyday use and defaults': '日常使用与默认值',
            'For a normal data or boot disk, leave advanced features disabled and fields blank unless needed. Gray text shows defaults; entering a value saves an override, and clearing it removes that override. Feature switches supply required activation parameters. Apply NVMe device changes by shutting down and starting the VM. Live migration, RAM snapshots and hibernation are unavailable. A boot disk also needs compatible VM firmware, an installed bootloader and selection in Boot Order.':
                '普通数据盘或启动盘按需开启高级功能，其余字段可留空。灰色文字显示默认值；填入值会保存覆盖项，清空会删除覆盖项。功能开关仅补充启用所需的参数。修改 NVMe 设备后需关闭再启动虚拟机；不支持在线迁移、包含内存的快照和休眠。作为启动盘还需虚拟机固件支持、盘上安装引导程序，并在启动顺序中选中。',
            'Controller identity and PCI IDs': '控制器身份与 PCI 标识',
            'Serial, model and firmware version accept at most 20, 40 and 8 printable ASCII characters. Defaults report the disk ID, QEMU NVMe Ctrl and the QEMU version. Model and firmware overrides need support in the host QEMU. These fields change reported identity; guest drivers still need NVMe support. Intel PCI IDs are enabled by default in this integration; change them only for driver compatibility testing.':
                '序列号、型号和固件版本最多接受 20、40、8 个可打印 ASCII 字符，默认分别上报磁盘标识、QEMU NVMe Ctrl 和 QEMU 版本。自定义型号和固件版本需要宿主 QEMU 支持。这些字段用于修改上报身份，来宾驱动仍需支持 NVMe。本实现默认启用 Intel PCI 标识，通常仅在测试驱动兼容性时修改。',
            'Queues, interrupts and transfer size': '队列、中断与传输大小',
            'The defaults allow 64 I/O queue pairs and 65 MSI-X vectors, including the admin interrupt. The guest chooses how many queues to use according to its CPUs and driver; larger limits alone do not guarantee higher throughput. MDTS is an exponent, not a size in MiB: the limit is 4096 bytes times 2^MDTS in this emulation, so 7 allows 512 KiB per command. Keep the defaults unless testing specific queue or transfer limits.':
                '默认允许 64 对 I/O 队列和 65 个 MSI-X 向量，其中包含管理队列中断。来宾会根据 CPU 数量和驱动选择实际队列数，提高上限本身不保证吞吐提升。MDTS 是指数，单位不是 MiB；当前模拟器的上限为 4096 字节乘以 2^MDTS，因此 7 表示每条命令最多 512 KiB。通常保留默认值，仅在测试特定队列或传输限制时调整。',
            'Controller Memory Buffer (CMB)': '控制器内存缓冲区（CMB）',
            'Enable CMB to expose a memory buffer in PCI BAR 2; an empty size uses 16 MiB. The size must be a power of two in MiB, such as 1, 2, 4, 8 or 16. It consumes additional host memory and its contents do not survive device recreation. The default NVMe 1.4 mode requires the guest driver to enable and use it. Legacy mode exposes NVMe 1.3 behavior for compatibility tests. Linux use of submission queues in CMB depends on nvme.use_cmb_sqes and driver support; if changing this boot parameter, reboot the guest. CMB cannot be combined with SR-IOV.':
                '开启 CMB 会在 PCI BAR 2 中提供内存缓冲区，大小留空时使用 16 MiB。大小必须为 2 的幂，例如 1、2、4、8 或 16 MiB。它会额外占用宿主机内存，设备重建后内容不保留。默认 NVMe 1.4 模式需要来宾驱动主动启用并使用；旧版模式用于测试 NVMe 1.3 行为。Linux 是否把提交队列放入 CMB 取决于 nvme.use_cmb_sqes 和驱动支持；修改该启动参数后需重启来宾。CMB 不能与 SR-IOV 同时使用。',
            'OCP and SMART logs': 'OCP 与 SMART 日志',
            'OCP enables the additional SMART/Health log at page 0xc0. Use a compatible nvme-cli OCP plugin to decode it, or inspect the raw log with get-log. SMART counters describe the virtual controller and reset when it is power cycled; inspect the host storage separately for physical disk health. The log fields supported by QEMU vary by version.':
                '开启 OCP 后可读取 0xc0 页的扩展 SMART/健康日志。可用兼容的 nvme-cli OCP 插件解码，或用 get-log 查看原始日志。SMART 计数反映虚拟控制器，并在设备断电重启后重置；物理盘健康状态需在宿主机另行查看。QEMU 支持的日志字段会随版本变化。',
            'Subsystems and controller paths': '子系统与控制器路径',
            'To add another namespace to an existing controller, select its owning disk in NVMe controller; configure all controller settings on that disk. References cannot be chained. Each disk retains its own backing volume. Multiple paths use one subsystem, and an empty path count uses 2 when enabled. Linux native multipath requires nvme_core.multipath=Y; reboot the guest after changing it. All paths access the same backing data. NQN suffixes accept up to 200 letters, digits and the characters _.:-. Keep them unique; QEMU prefixes them with nqn.2019-08.org.qemu:.':
                '需要给已有控制器增加命名空间时，在“NVMe 控制器”中选择所属磁盘，控制器参数统一在所属磁盘上设置，控制器引用不能串联。每块磁盘仍使用各自的后端卷。多路径使用同一子系统，开启后路径数留空时使用 2。Linux 原生多路径需要 nvme_core.multipath=Y，修改后需重启来宾。所有路径访问相同的后端数据。NQN 后缀最多接受 200 个字母、数字或 _.:- 字符，应保持唯一，QEMU 会自动添加 nqn.2019-08.org.qemu: 前缀。',
            'Linux device names': 'Linux 设备名',
            'Namespace IDs and persistent identifiers': '命名空间编号与持久标识',
            'With explicit namespaces, NSIDs must be unique within their subsystem and range from 1 to 256; blank uses the VM disk index plus one. The legacy single-namespace layout uses NSID 1. Explicit namespace UUIDs default to a stable value derived from the VM ID and disk slot. NGUID is unset when blank; EUI-64 follows the QEMU machine defaults. UUID uses the 8-4-4-4-12 hexadecimal format, NGUID uses 32 hexadecimal digits with optional hyphens between bytes, and EUI-64 uses 0x followed by 16 hexadecimal digits. Keep identifiers unique. UUID or NGUID set to auto changes at each cold start and can change persistent device paths. Device identifiers are separate from filesystem UUIDs.':
                '显式命名空间的 NSID 范围为 1～256，同一子系统内不能重复；留空时使用虚拟机磁盘编号加一，传统单命名空间布局则使用 NSID 1。显式命名空间的 UUID 默认由虚拟机 ID 和磁盘槽位生成稳定值；NGUID 留空时不设置，EUI-64 跟随 QEMU 机器类型的默认值。UUID 使用 8-4-4-4-12 位十六进制格式，NGUID 使用 32 位十六进制数字，可在字节之间加入连字符，EUI-64 使用 0x 加 16 位十六进制数字。不同命名空间应使用不同标识。UUID 或 NGUID 填写 auto 时会在每次冷启动重新随机生成，可能改变持久设备路径。设备标识与文件系统 UUID 相互独立。',
            'Sharing, detachment and booting': '共享、初始分离与启动',
            'Share across controller paths attaches the namespace to all controllers in this VM subsystem. It is independent of the storage Shared flag. A private namespace can attach to only one controller at a time and initially uses the primary path. Initially detached leaves it allocated but inaccessible until guest attachment, and it cannot be selected as a boot device. Leave detachment disabled for an ordinary data or boot disk.':
                '“在各控制器路径间共享”会把命名空间连接到本虚拟机子系统的所有控制器，与存储的“共享”标志相互独立。私有命名空间同一时间只能连接一条控制器路径，初始使用主路径。“初始不附加”会保留命名空间，但来宾手动附加前无法访问，也不能选择为启动设备。普通数据盘或启动盘通常保持初始不附加关闭。',
            'Attaching a detached namespace': '附加初始分离的命名空间',
            'List all allocated namespaces with list-ns -a, obtain controller IDs with list-ctrl, then attach the chosen NSID to the chosen CNTLID and rescan. CNTLID is the protocol controller ID, not necessarily the number in /dev/nvme0. Repeat attachment after cold starts while Initially detached remains enabled. Inspect actual device names again after rescanning.':
                '先用 list-ns -a 查看所有已分配的命名空间，用 list-ctrl 获取控制器标识，再把所需 NSID 附加到相应 CNTLID 并重新扫描。CNTLID 是协议中的控制器标识，不一定等于 /dev/nvme0 中的编号。保持“初始不附加”开启时，每次冷启动后都需重新附加。重新扫描后应再次确认实际设备名。',
            'Logical block size and existing data': '逻辑块大小与已有数据',
            'Choose 512 or 4096 data bytes per logical block; blank uses 512. Guest firmware, drivers and software must support the chosen format. Changing LBA size reinterprets existing image data and does not convert partition tables or filesystems. Back up and convert existing data before changing it. Metadata also reduces the data capacity reported to the guest.':
                '每个逻辑块的数据大小可选 512 或 4096 字节，留空时使用 512。来宾固件、驱动和软件需支持所选格式。修改 LBA 大小会重新解释已有镜像数据，不会自动转换分区表或文件系统；修改已有盘前应备份并转换数据。启用元数据还会减少向来宾报告的可用数据容量。',
            'Simple Copy usage and limits': 'Simple Copy 用法与限制',
            'Simple Copy copies logical block ranges within a namespace when guest software issues the NVMe Copy command. Normal file copying does not necessarily use it. Support is available by default; the switch only customizes limits. MSSRL limits each source range and MCL the total copied blocks. Defaults of 128 blocks allow 64 KiB with 512-byte LBAs or 512 KiB with 4096-byte LBAs. MSRC is the maximum range count minus one, so 127 means 128 ranges. Raw nvme copy overwrites destination LBAs; use an unmounted disposable test namespace and consult its version-specific help.':
                'Simple Copy 在来宾软件发送 NVMe Copy 命令时，在命名空间内部复制逻辑块范围；普通文件复制不一定调用它。功能默认可用，开关仅用于自定义限制。MSSRL 限制每个源范围的块数，MCL 限制一次复制的总块数。默认 128 块在 512 字节 LBA 下为 64 KiB，在 4096 字节 LBA 下为 512 KiB。MSRC 为最大源范围数量减一，127 表示 128 个范围。原始 nvme copy 会覆盖目标 LBA，只应在已卸载、可丢弃的测试命名空间上使用，并核对当前版本帮助。',
            'ZNS test workflow': 'ZNS 测试流程',
            'Use a guest kernel and filesystem that support zoned block devices. Btrfs can detect zoned mode automatically; the example explicitly selects it on a blank whole test namespace, without a conventional GPT layout. Replace nvmeXnY with the test device. Formatting erases its contents. Inspect zone state with report-zones. This QEMU emulation loses zone state on cold starts, so keep this workflow for disposable tests.':
                '来宾内核和文件系统必须支持区域顺序写入设备。Btrfs 可自动识别 zoned 模式，示例在整块空白测试命名空间上显式启用该模式，不使用常规 GPT 布局。请将 nvmeXnY 替换为测试设备，格式化会清除其中的内容。可用 report-zones 查看区域状态。当前 QEMU 模拟器冷启动会丢失区域状态，此流程仅适用于可丢弃的测试数据。',
            'Zone geometry and writable capacity': '区域布局与可写容量',
            'Zone size is the spacing between zone starts; zone capacity is the writable amount in each zone. Defaults use 128 MiB zones and capacity 0, meaning equal to zone size. Capacity cannot exceed zone size, and both must align to the logical block size. The namespace must fit at least one complete zone after metadata is accounted for. Choose a zone size supported by the guest filesystem; retain the 128 MiB default for the Btrfs test.':
                '区域大小表示相邻区域起点之间的距离，区域容量表示每个区域内可写入的容量。默认区域为 128 MiB，容量为 0 时与区域大小相同。容量不能大于区域大小，两者都需按逻辑块大小对齐；扣除元数据后，命名空间至少要容纳一个完整区域。区域大小还需被来宾文件系统支持，Btrfs 测试建议保留默认的 128 MiB。',
            'Open and active zone limits': '打开与活动区域限制',
            'Active zones include open and closed zones that have not become full or been reset. Maximum active zones 0 is unlimited. Maximum open zones 0 follows a nonzero active limit, otherwise it is unlimited. A nonzero open limit cannot exceed the active limit. Small limits can cause zone-resource errors or prevent a filesystem from working. Zone reset invalidates existing data in that zone; it is not a filesystem repair operation.':
                '活动区域包括尚未写满或重置的打开区域和关闭区域。最大活动区域数为 0 时不限制；最大打开区域数为 0 时，若设置了活动区域上限则跟随该上限，否则不限制。非零打开上限不能超过活动上限。上限过小可能导致区域资源不足或文件系统无法工作。区域重置会使该区域的已有数据失效，不能用于修复文件系统。',
            'Descriptors, cross-zone reads and Zone Append': '描述符、跨区域读取与 Zone Append',
            'Descriptor extension size is in bytes and must be a multiple of 64; 0 disables it. Read across zones permits a read command to cross a boundary while preserving the sequential-write rules. ZASL controls the maximum Zone Append transfer as 4096 bytes times 2^ZASL; 0 inherits MDTS and a nonzero value cannot exceed MDTS. ZASL belongs to the controller and is configured on its owning disk. ZNS cannot share an FDP-enabled subsystem.':
                '描述符扩展大小的单位为字节，必须是 64 的倍数，0 表示关闭。允许跨区域读取仅允许一条读命令跨越区域边界，顺序写入规则仍然有效。ZASL 控制 Zone Append 的最大传输量，为 4096 字节乘以 2^ZASL；0 表示跟随 MDTS，非零值不能大于 MDTS。ZASL 属于控制器参数，需在所属磁盘上设置。ZNS 不能使用已开启 FDP 的同一子系统。',
            'Metadata transport and data capacity': '元数据传输与数据容量',
            'Metadata associates additional bytes with each logical block. Enabling it with a blank size uses 8 bytes. Separate metadata uses MPTR; Extended LBA transfers data and metadata together. The guest driver must support the chosen mode. Data and metadata consume the same backing image: the number of data blocks is floor(image bytes / (LBA data bytes + metadata bytes)). A namespace with metadata cannot be resized by this integration.':
                '元数据为每个逻辑块关联额外字节，开启后大小留空时使用 8 字节。“单独传输元数据”使用 MPTR，“扩展 LBA”将数据与元数据一同传输，来宾驱动需支持对应模式。数据与元数据共同占用后端镜像：数据块数为镜像字节数除以（LBA 数据字节数 + 元数据字节数）后向下取整。当前实现不允许调整已启用元数据的命名空间容量。',
            'Protection types, placement and guards': '保护类型、位置与校验格式',
            'Protection information adds integrity checks to metadata. Enabling it with blank fields selects type 1. Types 1 and 2 validate reference tags using their respective addressing rules; type 3 omits that check. Match the type and first/last metadata placement to the guest integrity stack. The default 16-bit guard requires at least 8 metadata bytes. A 64-bit guard requires at least 16 bytes, which is also the blank-size fallback for that format. 32-bit guards are unsupported.':
                '数据保护信息在元数据中加入完整性校验，开启后类型留空时使用类型 1。类型 1、2 按各自的寻址规则校验参考标记，类型 3 不进行此项校验。类型以及位于元数据开头或末尾的位置需与来宾完整性栈匹配。默认 16 位校验至少需要 8 字节元数据；64 位校验至少需要 16 字节，此时元数据大小留空也会使用 16 字节。不支持 32 位校验。',
            'Firmware boot support': '固件启动支持',
            'SeaBIOS skips NVMe namespaces with metadata or protection information because its disk interface cannot transfer metadata. These namespaces remain available to a compatible guest driver after booting from another disk. Use an ordinary namespace without metadata for SeaBIOS boot. OVMF boot support depends on its NVMe driver and the selected format; verify firmware support before choosing a protected boot disk.':
                'SeaBIOS 的磁盘接口无法传输元数据，因此会跳过带元数据或数据保护的 NVMe 命名空间。从其他磁盘启动后，兼容的来宾驱动仍可访问这些命名空间。使用 SeaBIOS 启动时，请选择未启用元数据的普通命名空间。OVMF 是否支持启动取决于其 NVMe 驱动和所选格式，选择带数据保护的启动盘前需确认固件支持。',
            'Large metadata formats': '大元数据格式',
            'Linux kernels with an 8-bit integrity tuple size, including Linux 6.12, cannot safely handle more than 255 metadata bytes in Separate metadata mode and may crash. Use a format supported by the guest. Extended LBA can be used with a compatible passthrough application, but the standard Linux block device may be unavailable.':
                '包括 Linux 6.12 在内，完整性元组大小使用 8 位字段的 Linux 内核，无法在“单独传输元数据”模式下安全处理超过 255 字节的元数据，可能导致来宾崩溃。请选择来宾支持的格式。“扩展 LBA”可搭配兼容的命令直通应用使用，但可能不提供普通 Linux 块设备。',
            'Guest support and existing images': '来宾支持与已有镜像',
            'Keep metadata and protection disabled for ordinary use unless the guest supports the selected format. On Linux, check NVMe driver and block-integrity support; unsupported formats can leave the disk unavailable or cause I/O errors. Identify the active format before creating a filesystem. Changing LBA size, metadata size, transfer mode or protection settings does not convert existing data or generate valid protection information. Back up and convert existing images, or start with a blank disposable image.':
                '日常使用通常保持元数据和数据保护关闭，需要使用时先确认来宾支持所选格式。Linux 需核对 NVMe 驱动和块完整性支持，格式不受支持时可能没有可用磁盘或出现 I/O 错误。创建文件系统前先查看实际格式。修改 LBA 大小、元数据大小、传输模式或保护参数，不会自动转换已有数据或生成有效保护信息。已有镜像应先备份并转换，也可从空白、可丢弃的镜像开始测试。',
            'Creating a protected disk': '创建带数据保护的磁盘',
            'Create a new disk with protection already enabled to initialize its metadata before use. Initialization writes the metadata area and may take time and allocate storage on thin-provisioned volumes. Existing, imported, cloned and restored images retain their contents and must already have valid metadata for the selected format. Enabling protection on an existing zero-filled image does not initialize it.':
                '新建磁盘时启用数据保护，可在使用前初始化其元数据。初始化会写入元数据区域，可能需要一定时间，并占用精简配置卷的实际存储空间。已有、导入、克隆和恢复的镜像保留原有内容，需事先具有符合所选格式的有效元数据。对已有全零镜像开启数据保护不会自动初始化。',
            'Enable FDP and choose a workload': '启用 FDP 与选择工作负载',
            'FDP lets software direct writes to placement handles while retaining conventional random-write semantics. Enable it on the controller-owning disk; the subsystem defaults to 1 reclaim group, 16 reclaim unit handles and 96 MiB reclaim units. This QEMU emulation exposes one Endurance Group with ID 1 and always enables FDP Mode when configured. Ordinary filesystems can use default placement; exercising different placements requires a guest application or an FDP-capable fio io_uring_cmd workload.':
                'FDP 允许软件通过放置句柄引导写入，同时保留常规随机写入语义。在控制器所属磁盘上开启后，子系统默认使用 1 个回收组、16 个回收单元句柄和 96 MiB 回收单元。当前 QEMU 模拟器提供标识为 1 的单个耐久组，配置后始终启用 FDP 模式。普通文件系统可使用默认放置策略；测试不同放置策略需要来宾应用主动使用，或使用支持 FDP 的 fio io_uring_cmd 工作负载。',
            'Reclaim unit handles and namespace mapping': '回收单元句柄与命名空间映射',
            'The namespace handle list selects subsystem reclaim unit handles, using semicolons and inclusive ranges such as 0;8-15. Values must be distinct and less than the subsystem handle count. Manual lists reserve their handles first; blank lists share the first remaining free handle as placement handle 0. Leave at least one subsystem handle unselected when mixing manual and automatic mappings. Inspect the namespace status for its placement identifiers rather than treating a reclaim unit handle index as a placement identifier. Configure each namespace list on that disk, including when it shares another disk controller.':
                '命名空间句柄列表从子系统中选择回收单元句柄，使用分号和包含首尾的范围，例如 0;8-15。句柄不能重复，且必须小于子系统句柄总数。手动列表先保留指定句柄；留空的列表共用剩余的第一个空闲句柄，并将其映射到放置句柄 0。混用手动和自动映射时，至少留出一个未被手动选择的子系统句柄。应查看命名空间状态获取实际放置标识，不应直接把回收单元句柄序号当成放置标识。每个命名空间的列表在其自身磁盘上设置，共用其他磁盘控制器时也一样。',
            'FDP constraints and interpreting results': 'FDP 约束与结果解读',
            'Namespaces sharing a reclaim unit handle must use the same LBA data size and metadata byte count; namespaces using disjoint handles may use different formats. Reclaim unit size must be a multiple of every namespace LBA size, and the group/handle configuration must fit the placement identifier encoding. ZNS is incompatible with the entire FDP-enabled subsystem. QEMU is useful for protocol and placement-policy tests; physical SSD write-amplification and endurance benefits require validation on real hardware.':
                '共用回收单元句柄的命名空间必须使用相同的 LBA 数据大小和元数据字节数；使用互不重叠句柄的命名空间可使用不同格式。回收单元大小必须是每个命名空间 LBA 大小的整数倍，回收组和句柄配置还需能被放置标识编码。整个开启 FDP 的子系统都不能包含 ZNS。QEMU 适合测试协议和放置策略，真实 SSD 的写放大与寿命收益需在实际硬件上验证。',
            'SR-IOV requirements and resource budget': 'SR-IOV 条件与资源规划',
            'This experimental feature exposes virtual PCIe primary and secondary controller functions inside this guest. It requires Q35 or aarch64, one controller path and CMB disabled. An empty VF count uses 1. Empty flexible pools reserve 2 queue resources and 1 interrupt per VF; these include an admin queue and an I/O queue. Leave at least 2 queue resources and 1 interrupt for the primary controller. Per-VF limits of 0 divide the pool by the VF count; a nonzero queue limit must be at least 2 and fit the pool.':
                '此实验性功能在本来宾中提供虚拟 PCIe 主控制器和辅助控制器功能。需要 Q35 或 aarch64、仅一条控制器路径，并关闭 CMB。VF 数量留空时使用 1。灵活资源池留空时，每个 VF 分配 2 个队列资源和 1 个中断，其中队列包含管理队列和 I/O 队列；还需为主控制器至少保留 2 个队列资源和 1 个中断。每个 VF 的上限为 0 时按 VF 数量均分资源池；非零队列上限至少为 2，且不能超过资源池。',
            '1. Identify the PF and release flexible resources': '1. 确认 PF 并释放灵活资源',
            'The following sequence configures one VF with the default pools. Use a disposable data controller: Function Level Reset interrupts I/O to all its namespaces, so stop workloads and unmount them first. Obtain the PF PCI address and protocol controller IDs from this guest; replace PF-BDF, VF-BDF, PF-CNTLID and VF-CNTLID below. Release flexible interrupt and queue resources from the primary controller before resetting it.':
                '以下步骤以默认资源池配置一个 VF。请使用可丢弃的数据控制器：功能级复位会中断其所有命名空间的 I/O，操作前必须停止工作负载并卸载文件系统。请从本来宾获取 PF 的 PCI 地址和协议控制器标识，并替换下方的 PF-BDF、VF-BDF、PF-CNTLID 和 VF-CNTLID。复位前先从主控制器释放灵活中断和队列资源。',
            '2. Reset the PF and expose one VF': '2. 复位 PF 并启用一个 VF',
            'Reset the PF to make the released resources available, then enable one VF through its guest sysfs attribute. Recheck controller paths and IDs after reset, because enumeration can change. Enabling the VF alone does not allocate its NVMe resources or make the secondary controller online.':
                '通过复位 PF 使释放的资源生效，再使用来宾 sysfs 属性启用一个 VF。复位后设备枚举可能变化，请重新核对控制器路径和标识。仅启用 VF 尚未完成 NVMe 资源分配，也不会自动让辅助控制器上线。',
            '3. Assign resources, bring the VF online and bind it': '3. 分配资源、上线并绑定 VF',
            'Assign one interrupt and two queues to the actual secondary CNTLID, set it online, then bind its PCI function to the guest nvme driver if it is still unbound. The namespace must be shared or attached to that controller to provide a disk; follow the Namespace page when manual attachment is needed. Inspect the resulting devices before using them.':
                '向实际辅助控制器 CNTLID 分配 1 个中断和 2 个队列，将其上线；若仍未绑定，再把对应 PCI 功能绑定到来宾 nvme 驱动。命名空间需共享或附加到该控制器后才能提供磁盘，需要手动附加时参照“命名空间”页。使用前再次确认生成的设备。',
            'Cold starts and shared data': '冷启动与共享数据',
            'Check and reapply guest VF provisioning after cold starts, or automate it in the guest after validating the sequence. Shut the VM down before changing or disabling this feature in its configuration. PFs and VFs access this VM subsystem and its backing volumes; coordinate all access to a shared namespace. Virtual functions model protocol and PCIe behavior, so benchmark and validate the actual workload rather than assuming a performance gain.':
                '冷启动后需在来宾中检查并重新配置 VF，验证流程后也可在来宾中自动执行。修改或关闭虚拟机配置中的此功能前需先停机。PF 和 VF 访问本虚拟机子系统及其后端卷，使用共享命名空间时必须协调所有访问。虚拟功能用于模拟协议和 PCIe 行为，性能效果需用实际工作负载测试。',
            'Simple Copy is available by default; its switch customizes limits. Initially detached namespaces need guest attachment and cannot be boot devices. UUID defaults to a stable generated value; NGUID is unset and EUI-64 follows QEMU defaults. See Usage and precautions before changing identifiers or LBA size.':
                'Simple Copy 默认可用，开关用于自定义限制。初始不附加的命名空间需在来宾中附加，不能用作启动设备。UUID 默认生成稳定值，NGUID 不设置，EUI-64 跟随 QEMU 默认值。修改标识或 LBA 大小前请展开“使用方法与注意事项”。',
        },
        zh_TW: {
            'Type 1': '類型 1',
            'Type 2': '類型 2',
            'Type 3': '類型 3',
            '16-bit': '16 位元',
            '64-bit': '64 位元',
            Model: '型號',
            Controller: '控制器',
            Namespace: '命名空間',
            'NVMe controller': 'NVMe 控制器',
            'Serial number': '序號',
            'Firmware version': '韌體版本',
            'I/O queue pairs': 'I/O 佇列對數',
            'MSI-X vectors': 'MSI-X 向量數',
            'Use Intel PCI IDs': '使用 Intel PCI 識別碼',
            'Controller memory buffer': '控制器記憶體緩衝區',
            'Legacy CMB behavior': '舊版 CMB 行為',
            'OCP extended SMART log': 'OCP 擴充 SMART 日誌',
            'NVM subsystem': 'NVM 子系統',
            'Subsystem NQN suffix': '子系統 NQN 後綴',
            'Controller paths': '控制器路徑數',
            'Enable CMB': '啟用 CMB',
            'CMB size must be a power of two in MiB.': 'CMB 大小必須為 2 的冪，單位為 MiB。',
            'Multiple controller paths': '啟用控制器多路徑',
            'Customize Simple Copy limits': '自訂 Simple Copy 限制',
            'Enable metadata': '啟用中繼資料',
            'Enable protection information': '啟用資料保護資訊',
            'Enable SR-IOV': '啟用 SR-IOV',
            'Select a protection type.': '請選擇保護資訊類型。',
            'Use 0 for automatic allocation or at least 2 queues.':
                '填 0 表示自動分配，或設定至少 2 個佇列。',
            'Namespace ID': '命名空間識別碼',
            'Namespace UUID': '命名空間 UUID',
            'Logical block size': '邏輯區塊大小',
            'Share across controller paths': '在各控制器路徑間共用',
            'Initially detached': '初始不附加',
            'Zoned Namespace (ZNS)': '分區命名空間 (ZNS)',
            'Zone size': '區域大小',
            'Zone capacity': '區域容量',
            'Zone descriptor extension': '區域描述元擴充',
            'Read across zones': '允許跨區域讀取',
            'Maximum active zones': '最大作用中區域數',
            'Maximum open zones': '最大開啟區域數',
            'Metadata bytes per LBA': '每個 LBA 的中繼資料位元組數',
            'Metadata transfer': '中繼資料傳輸方式',
            'Protection information': '資料保護資訊',
            'Protection placement': '保護資訊位置',
            'Protection guard format': '保護檢查格式',
            'Flexible Data Placement (FDP)': '彈性資料放置 (FDP)',
            'Reclaim groups': '回收群組數',
            'Reclaim unit handles': '回收單元控制代碼數',
            'Reclaim unit size': '回收單元大小',
            'Namespace handle list': '命名空間控制代碼清單',
            'Maximum virtual functions': '最大虛擬功能數',
            'Flexible queue resources': '彈性佇列資源數',
            'Flexible interrupt resources': '彈性中斷資源數',
            'Maximum queues per VF': '每個 VF 的最大佇列數',
            'Maximum interrupts per VF': '每個 VF 的最大中斷數',
            'Dedicated controller': '獨立控制器',
            'Separate metadata': '單獨傳輸中繼資料',
            'Extended LBA': '擴充 LBA',
            'Last metadata bytes': '中繼資料末尾',
            'First metadata bytes': '中繼資料開頭',
            'Use printable ASCII characters.': '請使用可列印的 ASCII 字元。',
            'Automatic (disk index + 1)': '自動（磁碟編號 + 1）',
            'Automatic, stable UUID': '自動產生穩定的 UUID',
            'Not set': '不設定',
            'Automatic, unique per VM and controller': '自動產生，每台虛擬機的每個控制器唯一',
            'QEMU version': 'QEMU 版本',
            'Disk ID': '磁碟識別碼',
            'Automatic, or e.g. 0;8-15': '自動，或填寫如 0;8-15',
            'Invalid NVMe identifier or handle list.': 'NVMe 識別碼或控制代碼清單格式無效。',
            'Must be a multiple of 64 bytes.': '必須為 64 位元組的整數倍。',
            'Metadata and protection': '中繼資料與資料保護',
            'SR-IOV (experimental)': 'SR-IOV（實驗性）',
            'Leave fields empty to use the displayed defaults. Feature switches supply the parameters needed to enable the feature. Select an existing disk controller to add a namespace; configure controller settings on its owning disk. Multiple paths share one subsystem; private namespaces attach only to the primary path. Model and firmware overrides require QEMU support. NVMe device changes require a shutdown; live migration, RAM snapshots and hibernation are unavailable.':
                '留空時使用顯示的預設值，功能開關會產生啟用所需的參數。選擇既有磁碟的控制器可新增命名空間；控制器參數在其所屬磁碟上設定。多條路徑共用一個子系統，私有命名空間僅附加至主路徑。自訂型號和韌體版本需要 QEMU 支援。修改 NVMe 裝置需要關閉虛擬機；不支援線上遷移、包含記憶體的快照和休眠。',
            'With Linux native NVMe multipath, nvme0n1 is the namespace access device and nvme0c0n1 is a controller path, which can appear in logs even with one path. In nvme0c0n1, the first 0 identifies the subsystem, c0 the controller path, and n1 the namespace device index; this index can differ from NSID. Normally use /dev/nvme0n1 or its partitions for partitioning, formatting and mounting.':
                '使用 Linux 原生 NVMe 多路徑時，nvme0n1 是命名空間的統一存取入口，nvme0c0n1 是具體控制器路徑；即使只有一條路徑，日誌中也可能顯示後者。nvme0c0n1 中，第一個 0 為子系統編號，c0 為控制器路徑編號，n1 為命名空間裝置編號，該編號可能與 NSID 不同。分割、格式化和掛載通常使用 /dev/nvme0n1 或其分割區。',
            'ZNS requires sequential writes and a guest filesystem with zoned-device support, such as Btrfs in zoned mode. Standard GPT partitioning and ext4 formatting can fail with I/O errors; leave ZNS disabled for ordinary disks. This QEMU emulation resets zone write pointers and state on cold starts, so existing filesystem data may become inaccessible; use it for testing. A zone capacity of 0 uses the zone size; a limit of 0 is unlimited or follows the active limit. ZNS and FDP cannot be combined.':
                'ZNS 要求按區域循序寫入，客體檔案系統需支援 ZNS，例如 Btrfs 的 zoned 模式。一般 GPT 分割和 ext4 格式化可能回報 I/O 錯誤；一般磁碟請保持 ZNS 關閉。目前 QEMU 模擬器冷開機時會重設區域寫入指標和狀態，既有檔案系統資料可能無法存取，請用於測試。區域容量為 0 時使用區域大小；數量限制為 0 時不限制，或跟隨作用中區域限制。ZNS 不能與 FDP 同時使用。',
            'Metadata and protection are disabled by default. When enabled, blank fields use 8 metadata bytes and protection type 1; 64-bit guards use 16 metadata bytes. Metadata consumes backing image capacity and prevents resizing. Changing LBA size or metadata reinterprets existing image data; it does not convert the image.':
                '中繼資料和資料保護預設關閉。啟用後留空時使用 8 位元組中繼資料和類型 1 保護；64 位元檢查使用 16 位元組中繼資料。中繼資料會占用後端映像容量，並使映像無法調整大小。修改 LBA 大小或中繼資料設定會改變既有映像資料的解讀方式，不會轉換映像。',
            'FDP is disabled by default. When enabled, the subsystem uses 1 reclaim group, 16 handles and 96 MiB reclaim units unless overridden. Namespace handle lists use semicolons and ranges. Namespaces sharing a reclaim unit handle must use the same LBA and metadata format. Reclaim unit size must be a multiple of every namespace LBA size.':
                'FDP 預設關閉。啟用後預設使用 1 個回收群組、16 個控制代碼和 96 MiB 回收單元。命名空間控制代碼清單使用分號分隔，支援範圍。共用回收單元控制代碼的命名空間必須使用相同的 LBA 與中繼資料格式。回收單元大小必須是每個命名空間 LBA 大小的整數倍。',
            'SR-IOV is disabled by default. When enabled, an empty VF count uses 1 VF. It requires Q35 or aarch64 and a single controller path. Empty resources use two queues and one interrupt per VF, with per-VF limits derived from the pool. Leave resources for the primary controller. Provision VFs from the guest using nvme-cli.':
                'SR-IOV 預設關閉，啟用後 VF 數量留空時使用 1 個 VF。需要 Q35 或 aarch64，且控制器只能有一條路徑。資源留空時，每個 VF 分配兩個佇列和一個中斷，每個 VF 的上限由資源池計算。需要為主控制器保留資源。在客體中使用 nvme-cli 設定 VF。',
            'Usage and precautions': '使用方法與注意事項',
            'Automatic (QEMU default)': '自動（QEMU 預設值）',
            'QEMU NVMe documentation': 'QEMU NVMe 文件',
            'The examples target Linux guests. Install nvme-cli and the other tools shown, then run commands as root. Replace example device paths and values in angle brackets with those reported by that guest. Command names and supported features depend on the guest kernel and nvme-cli version; check nvme help when needed.':
                '範例以 Linux 客體為例。請安裝 nvme-cli 和範例中所需的其他工具，再以 root 執行命令。請依實際裝置替換範例路徑與角括號中的值。命令名稱和可用功能取決於客體核心及 nvme-cli 版本，必要時使用 nvme help 查看。',
            'Everyday use and defaults': '日常使用與預設值',
            'For a normal data or boot disk, leave advanced features disabled and fields blank unless needed. Gray text shows defaults; entering a value saves an override, and clearing it removes that override. Feature switches supply required activation parameters. Apply NVMe device changes by shutting down and starting the VM. Live migration, RAM snapshots and hibernation are unavailable. A boot disk also needs compatible VM firmware, an installed bootloader and selection in Boot Order.':
                '一般資料碟或開機磁碟依需求啟用進階功能，其餘欄位可留空。灰色文字顯示預設值；填入值會儲存覆寫項目，清空會刪除覆寫項目。功能開關僅補充啟用所需的參數。修改 NVMe 裝置後需關閉再啟動虛擬機；不支援線上遷移、包含記憶體的快照和休眠。作為開機磁碟還需虛擬機韌體支援、磁碟上安裝開機載入程式，並在開機順序中選取。',
            'Controller identity and PCI IDs': '控制器識別資訊與 PCI 識別碼',
            'Serial, model and firmware version accept at most 20, 40 and 8 printable ASCII characters. Defaults report the disk ID, QEMU NVMe Ctrl and the QEMU version. Model and firmware overrides need support in the host QEMU. These fields change reported identity; guest drivers still need NVMe support. Intel PCI IDs are enabled by default in this integration; change them only for driver compatibility testing.':
                '序號、型號和韌體版本最多接受 20、40、8 個可列印 ASCII 字元，預設分別回報磁碟識別碼、QEMU NVMe Ctrl 和 QEMU 版本。自訂型號和韌體版本需要主機 QEMU 支援。這些欄位用於修改回報的識別資訊，客體驅動程式仍需支援 NVMe。本實作預設啟用 Intel PCI 識別碼，通常僅在測試驅動程式相容性時修改。',
            'Queues, interrupts and transfer size': '佇列、中斷與傳輸大小',
            'The defaults allow 64 I/O queue pairs and 65 MSI-X vectors, including the admin interrupt. The guest chooses how many queues to use according to its CPUs and driver; larger limits alone do not guarantee higher throughput. MDTS is an exponent, not a size in MiB: the limit is 4096 bytes times 2^MDTS in this emulation, so 7 allows 512 KiB per command. Keep the defaults unless testing specific queue or transfer limits.':
                '預設允許 64 對 I/O 佇列和 65 個 MSI-X 向量，其中包含管理佇列中斷。客體會依 CPU 數量和驅動程式選擇實際佇列數，提高上限本身不保證吞吐量提升。MDTS 是指數，單位不是 MiB；目前模擬器的上限為 4096 位元組乘以 2^MDTS，因此 7 表示每條命令最多 512 KiB。通常保留預設值，僅在測試特定佇列或傳輸限制時調整。',
            'Controller Memory Buffer (CMB)': '控制器記憶體緩衝區（CMB）',
            'Enable CMB to expose a memory buffer in PCI BAR 2; an empty size uses 16 MiB. The size must be a power of two in MiB, such as 1, 2, 4, 8 or 16. It consumes additional host memory and its contents do not survive device recreation. The default NVMe 1.4 mode requires the guest driver to enable and use it. Legacy mode exposes NVMe 1.3 behavior for compatibility tests. Linux use of submission queues in CMB depends on nvme.use_cmb_sqes and driver support; if changing this boot parameter, reboot the guest. CMB cannot be combined with SR-IOV.':
                '啟用 CMB 會在 PCI BAR 2 中提供記憶體緩衝區，大小留空時使用 16 MiB。大小必須為 2 的冪，例如 1、2、4、8 或 16 MiB。它會額外占用主機記憶體，裝置重建後內容不保留。預設 NVMe 1.4 模式需要客體驅動程式主動啟用並使用；舊版模式用於測試 NVMe 1.3 行為。Linux 是否將提交佇列放入 CMB 取決於 nvme.use_cmb_sqes 和驅動程式支援；修改該開機參數後需重新啟動客體。CMB 不能與 SR-IOV 同時使用。',
            'OCP and SMART logs': 'OCP 與 SMART 日誌',
            'OCP enables the additional SMART/Health log at page 0xc0. Use a compatible nvme-cli OCP plugin to decode it, or inspect the raw log with get-log. SMART counters describe the virtual controller and reset when it is power cycled; inspect the host storage separately for physical disk health. The log fields supported by QEMU vary by version.':
                '啟用 OCP 後可讀取 0xc0 頁的擴充 SMART／健康日誌。可用相容的 nvme-cli OCP 外掛程式解碼，或用 get-log 查看原始日誌。SMART 計數反映虛擬控制器，並在裝置斷電重新啟動後重設；實體磁碟健康狀態需在主機另外查看。QEMU 支援的日誌欄位會隨版本變化。',
            'Subsystems and controller paths': '子系統與控制器路徑',
            'To add another namespace to an existing controller, select its owning disk in NVMe controller; configure all controller settings on that disk. References cannot be chained. Each disk retains its own backing volume. Multiple paths use one subsystem, and an empty path count uses 2 when enabled. Linux native multipath requires nvme_core.multipath=Y; reboot the guest after changing it. All paths access the same backing data. NQN suffixes accept up to 200 letters, digits and the characters _.:-. Keep them unique; QEMU prefixes them with nqn.2019-08.org.qemu:.':
                '需要為既有控制器增加命名空間時，在「NVMe 控制器」中選擇所屬磁碟，控制器參數統一在所屬磁碟上設定，控制器參照不能串聯。每塊磁碟仍使用各自的後端磁碟區。多路徑使用同一子系統，啟用後路徑數留空時使用 2。Linux 原生多路徑需要 nvme_core.multipath=Y，修改後需重新啟動客體。所有路徑存取相同的後端資料。NQN 後綴最多接受 200 個字母、數字或 _.:- 字元，應保持唯一，QEMU 會自動加入 nqn.2019-08.org.qemu: 前綴。',
            'Linux device names': 'Linux 裝置名稱',
            'Namespace IDs and persistent identifiers': '命名空間編號與持續性識別碼',
            'With explicit namespaces, NSIDs must be unique within their subsystem and range from 1 to 256; blank uses the VM disk index plus one. The legacy single-namespace layout uses NSID 1. Explicit namespace UUIDs default to a stable value derived from the VM ID and disk slot. NGUID is unset when blank; EUI-64 follows the QEMU machine defaults. UUID uses the 8-4-4-4-12 hexadecimal format, NGUID uses 32 hexadecimal digits with optional hyphens between bytes, and EUI-64 uses 0x followed by 16 hexadecimal digits. Keep identifiers unique. UUID or NGUID set to auto changes at each cold start and can change persistent device paths. Device identifiers are separate from filesystem UUIDs.':
                '明確設定的命名空間 NSID 範圍為 1～256，同一子系統內不能重複；留空時使用虛擬機磁碟編號加一，傳統單一命名空間配置則使用 NSID 1。明確設定的命名空間 UUID 預設由虛擬機 ID 和磁碟插槽產生穩定值；NGUID 留空時不設定，EUI-64 跟隨 QEMU 機器類型的預設值。UUID 使用 8-4-4-4-12 位十六進位格式，NGUID 使用 32 位十六進位數字，可在位元組之間加入連字號，EUI-64 使用 0x 加 16 位十六進位數字。不同命名空間應使用不同識別碼。UUID 或 NGUID 填寫 auto 時會在每次冷開機重新隨機產生，可能改變持續性裝置路徑。裝置識別碼與檔案系統 UUID 相互獨立。',
            'Sharing, detachment and booting': '共用、初始分離與開機',
            'Share across controller paths attaches the namespace to all controllers in this VM subsystem. It is independent of the storage Shared flag. A private namespace can attach to only one controller at a time and initially uses the primary path. Initially detached leaves it allocated but inaccessible until guest attachment, and it cannot be selected as a boot device. Leave detachment disabled for an ordinary data or boot disk.':
                '「在各控制器路徑間共用」會將命名空間連接至本虛擬機子系統的所有控制器，與儲存的「共用」旗標相互獨立。私有命名空間同一時間只能連接一條控制器路徑，初始使用主路徑。「初始不附加」會保留命名空間，但客體手動附加前無法存取，也不能選擇為開機裝置。一般資料碟或開機磁碟通常保持初始不附加關閉。',
            'Attaching a detached namespace': '附加初始分離的命名空間',
            'List all allocated namespaces with list-ns -a, obtain controller IDs with list-ctrl, then attach the chosen NSID to the chosen CNTLID and rescan. CNTLID is the protocol controller ID, not necessarily the number in /dev/nvme0. Repeat attachment after cold starts while Initially detached remains enabled. Inspect actual device names again after rescanning.':
                '先用 list-ns -a 查看所有已配置的命名空間，用 list-ctrl 取得控制器識別碼，再將所需 NSID 附加至對應 CNTLID 並重新掃描。CNTLID 是協定中的控制器識別碼，不一定等於 /dev/nvme0 中的編號。保持「初始不附加」啟用時，每次冷開機後都需重新附加。重新掃描後應再次確認實際裝置名稱。',
            'Logical block size and existing data': '邏輯區塊大小與既有資料',
            'Choose 512 or 4096 data bytes per logical block; blank uses 512. Guest firmware, drivers and software must support the chosen format. Changing LBA size reinterprets existing image data and does not convert partition tables or filesystems. Back up and convert existing data before changing it. Metadata also reduces the data capacity reported to the guest.':
                '每個邏輯區塊的資料大小可選 512 或 4096 位元組，留空時使用 512。客體韌體、驅動程式和軟體需支援所選格式。修改 LBA 大小會重新解讀既有映像資料，不會自動轉換分割表或檔案系統；修改既有磁碟前應備份並轉換資料。啟用中繼資料還會減少向客體回報的可用資料容量。',
            'Simple Copy usage and limits': 'Simple Copy 用法與限制',
            'Simple Copy copies logical block ranges within a namespace when guest software issues the NVMe Copy command. Normal file copying does not necessarily use it. Support is available by default; the switch only customizes limits. MSSRL limits each source range and MCL the total copied blocks. Defaults of 128 blocks allow 64 KiB with 512-byte LBAs or 512 KiB with 4096-byte LBAs. MSRC is the maximum range count minus one, so 127 means 128 ranges. Raw nvme copy overwrites destination LBAs; use an unmounted disposable test namespace and consult its version-specific help.':
                'Simple Copy 在客體軟體傳送 NVMe Copy 命令時，在命名空間內部複製邏輯區塊範圍；一般檔案複製不一定呼叫它。功能預設可用，開關僅用於自訂限制。MSSRL 限制每個來源範圍的區塊數，MCL 限制一次複製的總區塊數。預設 128 塊在 512 位元組 LBA 下為 64 KiB，在 4096 位元組 LBA 下為 512 KiB。MSRC 為最大來源範圍數量減一，127 表示 128 個範圍。原始 nvme copy 會覆寫目標 LBA，只應在已卸載、可捨棄的測試命名空間上使用，並核對目前版本說明。',
            'ZNS test workflow': 'ZNS 測試流程',
            'Use a guest kernel and filesystem that support zoned block devices. Btrfs can detect zoned mode automatically; the example explicitly selects it on a blank whole test namespace, without a conventional GPT layout. Replace nvmeXnY with the test device. Formatting erases its contents. Inspect zone state with report-zones. This QEMU emulation loses zone state on cold starts, so keep this workflow for disposable tests.':
                '客體核心和檔案系統必須支援區域循序寫入裝置。Btrfs 可自動辨識 zoned 模式，範例在整塊空白測試命名空間上明確啟用該模式，不使用一般 GPT 配置。請將 nvmeXnY 替換為測試裝置，格式化會清除其中的內容。可用 report-zones 查看區域狀態。目前 QEMU 模擬器冷開機會遺失區域狀態，此流程僅適用於可捨棄的測試資料。',
            'Zone geometry and writable capacity': '區域配置與可寫容量',
            'Zone size is the spacing between zone starts; zone capacity is the writable amount in each zone. Defaults use 128 MiB zones and capacity 0, meaning equal to zone size. Capacity cannot exceed zone size, and both must align to the logical block size. The namespace must fit at least one complete zone after metadata is accounted for. Choose a zone size supported by the guest filesystem; retain the 128 MiB default for the Btrfs test.':
                '區域大小表示相鄰區域起點之間的距離，區域容量表示每個區域內可寫入的容量。預設區域為 128 MiB，容量為 0 時與區域大小相同。容量不能大於區域大小，兩者都需依邏輯區塊大小對齊；扣除中繼資料後，命名空間至少要容納一個完整區域。區域大小還需被客體檔案系統支援，Btrfs 測試建議保留預設的 128 MiB。',
            'Open and active zone limits': '開啟與作用中區域限制',
            'Active zones include open and closed zones that have not become full or been reset. Maximum active zones 0 is unlimited. Maximum open zones 0 follows a nonzero active limit, otherwise it is unlimited. A nonzero open limit cannot exceed the active limit. Small limits can cause zone-resource errors or prevent a filesystem from working. Zone reset invalidates existing data in that zone; it is not a filesystem repair operation.':
                '作用中區域包含尚未寫滿或重設的開啟區域和關閉區域。最大作用中區域數為 0 時不限制；最大開啟區域數為 0 時，若設定了作用中區域上限則跟隨該上限，否則不限制。非零開啟上限不能超過作用中上限。上限過小可能導致區域資源不足或檔案系統無法運作。區域重設會使該區域的既有資料失效，不能用於修復檔案系統。',
            'Descriptors, cross-zone reads and Zone Append': '描述元、跨區域讀取與 Zone Append',
            'Descriptor extension size is in bytes and must be a multiple of 64; 0 disables it. Read across zones permits a read command to cross a boundary while preserving the sequential-write rules. ZASL controls the maximum Zone Append transfer as 4096 bytes times 2^ZASL; 0 inherits MDTS and a nonzero value cannot exceed MDTS. ZASL belongs to the controller and is configured on its owning disk. ZNS cannot share an FDP-enabled subsystem.':
                '描述元擴充大小的單位為位元組，必須是 64 的倍數，0 表示關閉。允許跨區域讀取僅允許一條讀取命令跨越區域邊界，循序寫入規則仍然有效。ZASL 控制 Zone Append 的最大傳輸量，為 4096 位元組乘以 2^ZASL；0 表示跟隨 MDTS，非零值不能大於 MDTS。ZASL 屬於控制器參數，需在所屬磁碟上設定。ZNS 不能使用已啟用 FDP 的同一子系統。',
            'Metadata transport and data capacity': '中繼資料傳輸與資料容量',
            'Metadata associates additional bytes with each logical block. Enabling it with a blank size uses 8 bytes. Separate metadata uses MPTR; Extended LBA transfers data and metadata together. The guest driver must support the chosen mode. Data and metadata consume the same backing image: the number of data blocks is floor(image bytes / (LBA data bytes + metadata bytes)). A namespace with metadata cannot be resized by this integration.':
                '中繼資料為每個邏輯區塊關聯額外位元組，啟用後大小留空時使用 8 位元組。「單獨傳輸中繼資料」使用 MPTR，「擴充 LBA」將資料與中繼資料一同傳輸，客體驅動程式需支援對應模式。資料與中繼資料共同占用後端映像：資料區塊數為映像位元組數除以（LBA 資料位元組數 + 中繼資料位元組數）後向下取整。目前實作不允許調整已啟用中繼資料的命名空間容量。',
            'Protection types, placement and guards': '保護類型、位置與校驗格式',
            'Protection information adds integrity checks to metadata. Enabling it with blank fields selects type 1. Types 1 and 2 validate reference tags using their respective addressing rules; type 3 omits that check. Match the type and first/last metadata placement to the guest integrity stack. The default 16-bit guard requires at least 8 metadata bytes. A 64-bit guard requires at least 16 bytes, which is also the blank-size fallback for that format. 32-bit guards are unsupported.':
                '資料保護資訊在中繼資料中加入完整性校驗，啟用後類型留空時使用類型 1。類型 1、2 依各自的定址規則校驗參考標記，類型 3 不進行此項校驗。類型以及位於中繼資料開頭或末尾的位置需與客體完整性堆疊相符。預設 16 位元校驗至少需要 8 位元組中繼資料；64 位元校驗至少需要 16 位元組，此時中繼資料大小留空也會使用 16 位元組。不支援 32 位元校驗。',
            'Firmware boot support': '韌體開機支援',
            'SeaBIOS skips NVMe namespaces with metadata or protection information because its disk interface cannot transfer metadata. These namespaces remain available to a compatible guest driver after booting from another disk. Use an ordinary namespace without metadata for SeaBIOS boot. OVMF boot support depends on its NVMe driver and the selected format; verify firmware support before choosing a protected boot disk.':
                'SeaBIOS 的磁碟介面無法傳輸中繼資料，因此會略過帶中繼資料或資料保護的 NVMe 命名空間。從其他磁碟開機後，相容的客體驅動程式仍可存取這些命名空間。使用 SeaBIOS 開機時，請選擇未啟用中繼資料的一般命名空間。OVMF 是否支援開機取決於其 NVMe 驅動程式及所選格式，選擇帶資料保護的開機磁碟前需確認韌體支援。',
            'Large metadata formats': '大型中繼資料格式',
            'Linux kernels with an 8-bit integrity tuple size, including Linux 6.12, cannot safely handle more than 255 metadata bytes in Separate metadata mode and may crash. Use a format supported by the guest. Extended LBA can be used with a compatible passthrough application, but the standard Linux block device may be unavailable.':
                '包括 Linux 6.12 在內，完整性元組大小使用 8 位元欄位的 Linux 核心，無法在「單獨傳輸中繼資料」模式下安全處理超過 255 位元組的中繼資料，可能導致客體當機。請選擇客體支援的格式。「擴充 LBA」可搭配相容的命令直通應用程式使用，但可能不提供一般 Linux 區塊裝置。',
            'Guest support and existing images': '客體支援與既有映像',
            'Keep metadata and protection disabled for ordinary use unless the guest supports the selected format. On Linux, check NVMe driver and block-integrity support; unsupported formats can leave the disk unavailable or cause I/O errors. Identify the active format before creating a filesystem. Changing LBA size, metadata size, transfer mode or protection settings does not convert existing data or generate valid protection information. Back up and convert existing images, or start with a blank disposable image.':
                '日常使用通常保持中繼資料和資料保護關閉，需要使用時先確認客體支援所選格式。Linux 需核對 NVMe 驅動程式和區塊完整性支援，格式不受支援時可能沒有可用磁碟或出現 I/O 錯誤。建立檔案系統前先查看實際格式。修改 LBA 大小、中繼資料大小、傳輸模式或保護參數，不會自動轉換既有資料或產生有效保護資訊。既有映像應先備份並轉換，也可從空白、可捨棄的映像開始測試。',
            'Creating a protected disk': '建立含資料保護的磁碟',
            'Create a new disk with protection already enabled to initialize its metadata before use. Initialization writes the metadata area and may take time and allocate storage on thin-provisioned volumes. Existing, imported, cloned and restored images retain their contents and must already have valid metadata for the selected format. Enabling protection on an existing zero-filled image does not initialize it.':
                '新增磁碟時啟用資料保護，可在使用前初始化其中繼資料。初始化會寫入中繼資料區域，可能需要一些時間，並占用精簡佈建磁碟區的實際儲存空間。既有、匯入、複製和還原的映像保留原有內容，需事先具有符合所選格式的有效中繼資料。對既有全零映像啟用資料保護不會自動初始化。',
            'Enable FDP and choose a workload': '啟用 FDP 與選擇工作負載',
            'FDP lets software direct writes to placement handles while retaining conventional random-write semantics. Enable it on the controller-owning disk; the subsystem defaults to 1 reclaim group, 16 reclaim unit handles and 96 MiB reclaim units. This QEMU emulation exposes one Endurance Group with ID 1 and always enables FDP Mode when configured. Ordinary filesystems can use default placement; exercising different placements requires a guest application or an FDP-capable fio io_uring_cmd workload.':
                'FDP 允許軟體透過放置控制代碼引導寫入，同時保留一般隨機寫入語意。在控制器所屬磁碟上啟用後，子系統預設使用 1 個回收群組、16 個回收單元控制代碼和 96 MiB 回收單元。目前 QEMU 模擬器提供識別碼為 1 的單一耐久群組，設定後始終啟用 FDP 模式。一般檔案系統可使用預設放置策略；測試不同放置策略需要客體應用程式主動使用，或使用支援 FDP 的 fio io_uring_cmd 工作負載。',
            'Reclaim unit handles and namespace mapping': '回收單元控制代碼與命名空間對應',
            'The namespace handle list selects subsystem reclaim unit handles, using semicolons and inclusive ranges such as 0;8-15. Values must be distinct and less than the subsystem handle count. Manual lists reserve their handles first; blank lists share the first remaining free handle as placement handle 0. Leave at least one subsystem handle unselected when mixing manual and automatic mappings. Inspect the namespace status for its placement identifiers rather than treating a reclaim unit handle index as a placement identifier. Configure each namespace list on that disk, including when it shares another disk controller.':
                '命名空間控制代碼清單從子系統中選擇回收單元控制代碼，使用分號和包含首尾的範圍，例如 0;8-15。控制代碼不能重複，且必須小於子系統控制代碼總數。手動清單先保留指定控制代碼；留空的清單共用剩餘的第一個閒置控制代碼，並將其對應到放置控制代碼 0。混用手動與自動對應時，至少留出一個未被手動選取的子系統控制代碼。應查看命名空間狀態取得實際放置識別碼，不應直接將回收單元控制代碼序號當成放置識別碼。每個命名空間的清單在其自身磁碟上設定，共用其他磁碟控制器時也一樣。',
            'FDP constraints and interpreting results': 'FDP 限制與結果解讀',
            'Namespaces sharing a reclaim unit handle must use the same LBA data size and metadata byte count; namespaces using disjoint handles may use different formats. Reclaim unit size must be a multiple of every namespace LBA size, and the group/handle configuration must fit the placement identifier encoding. ZNS is incompatible with the entire FDP-enabled subsystem. QEMU is useful for protocol and placement-policy tests; physical SSD write-amplification and endurance benefits require validation on real hardware.':
                '共用回收單元控制代碼的命名空間必須使用相同的 LBA 資料大小和中繼資料位元組數；使用互不重疊控制代碼的命名空間可使用不同格式。回收單元大小必須是每個命名空間 LBA 大小的整數倍，回收群組和控制代碼設定還需能被放置識別碼編碼。整個啟用 FDP 的子系統都不能包含 ZNS。QEMU 適合測試協定和放置策略，真實 SSD 的寫入放大與壽命收益需在實際硬體上驗證。',
            'SR-IOV requirements and resource budget': 'SR-IOV 條件與資源規劃',
            'This experimental feature exposes virtual PCIe primary and secondary controller functions inside this guest. It requires Q35 or aarch64, one controller path and CMB disabled. An empty VF count uses 1. Empty flexible pools reserve 2 queue resources and 1 interrupt per VF; these include an admin queue and an I/O queue. Leave at least 2 queue resources and 1 interrupt for the primary controller. Per-VF limits of 0 divide the pool by the VF count; a nonzero queue limit must be at least 2 and fit the pool.':
                '此實驗性功能在本客體中提供虛擬 PCIe 主控制器和輔助控制器功能。需要 Q35 或 aarch64、僅一條控制器路徑，並關閉 CMB。VF 數量留空時使用 1。彈性資源池留空時，每個 VF 分配 2 個佇列資源和 1 個中斷，其中佇列包含管理佇列和 I/O 佇列；還需為主控制器至少保留 2 個佇列資源和 1 個中斷。每個 VF 的上限為 0 時依 VF 數量均分資源池；非零佇列上限至少為 2，且不能超過資源池。',
            '1. Identify the PF and release flexible resources': '1. 確認 PF 並釋放彈性資源',
            'The following sequence configures one VF with the default pools. Use a disposable data controller: Function Level Reset interrupts I/O to all its namespaces, so stop workloads and unmount them first. Obtain the PF PCI address and protocol controller IDs from this guest; replace PF-BDF, VF-BDF, PF-CNTLID and VF-CNTLID below. Release flexible interrupt and queue resources from the primary controller before resetting it.':
                '以下步驟以預設資源池設定一個 VF。請使用可捨棄的資料控制器：功能層級重設會中斷其所有命名空間的 I/O，操作前必須停止工作負載並卸載檔案系統。請從本客體取得 PF 的 PCI 位址和協定控制器識別碼，並替換下方的 PF-BDF、VF-BDF、PF-CNTLID 和 VF-CNTLID。重設前先從主控制器釋放彈性中斷和佇列資源。',
            '2. Reset the PF and expose one VF': '2. 重設 PF 並啟用一個 VF',
            'Reset the PF to make the released resources available, then enable one VF through its guest sysfs attribute. Recheck controller paths and IDs after reset, because enumeration can change. Enabling the VF alone does not allocate its NVMe resources or make the secondary controller online.':
                '透過重設 PF 使釋放的資源生效，再使用客體 sysfs 屬性啟用一個 VF。重設後裝置列舉可能變化，請重新核對控制器路徑和識別碼。僅啟用 VF 尚未完成 NVMe 資源分配，也不會自動讓輔助控制器上線。',
            '3. Assign resources, bring the VF online and bind it': '3. 分配資源、上線並繫結 VF',
            'Assign one interrupt and two queues to the actual secondary CNTLID, set it online, then bind its PCI function to the guest nvme driver if it is still unbound. The namespace must be shared or attached to that controller to provide a disk; follow the Namespace page when manual attachment is needed. Inspect the resulting devices before using them.':
                '向實際輔助控制器 CNTLID 分配 1 個中斷和 2 個佇列，將其上線；若仍未繫結，再將對應 PCI 功能繫結至客體 nvme 驅動程式。命名空間需共用或附加至該控制器後才能提供磁碟，需要手動附加時參照「命名空間」頁。使用前再次確認產生的裝置。',
            'Cold starts and shared data': '冷開機與共用資料',
            'Check and reapply guest VF provisioning after cold starts, or automate it in the guest after validating the sequence. Shut the VM down before changing or disabling this feature in its configuration. PFs and VFs access this VM subsystem and its backing volumes; coordinate all access to a shared namespace. Virtual functions model protocol and PCIe behavior, so benchmark and validate the actual workload rather than assuming a performance gain.':
                '冷開機後需在客體中檢查並重新設定 VF，驗證流程後也可在客體中自動執行。修改或關閉虛擬機設定中的此功能前需先關機。PF 和 VF 存取本虛擬機子系統及其後端磁碟區，使用共用命名空間時必須協調所有存取。虛擬功能用於模擬協定和 PCIe 行為，效能效果需用實際工作負載測試。',
            'Simple Copy is available by default; its switch customizes limits. Initially detached namespaces need guest attachment and cannot be boot devices. UUID defaults to a stable generated value; NGUID is unset and EUI-64 follows QEMU defaults. See Usage and precautions before changing identifiers or LBA size.':
                'Simple Copy 預設可用，開關用於自訂限制。初始不附加的命名空間需在客體中附加，不能用作開機裝置。UUID 預設產生穩定值，NGUID 不設定，EUI-64 跟隨 QEMU 預設值。修改識別碼或 LBA 大小前請展開「使用方法與注意事項」。',
        },
    }[Proxmox.defaultLang];
    const catalog = globalThis.__proxmox_i18n_msgcat__;
    const digest = globalThis.fnv31a;
    if (!translations || !catalog || typeof digest !== 'function') {
        return;
    }
    for (const [message, translation] of Object.entries(translations)) {
        const key = digest(message);
        if (!catalog[key]?.[0]) {
            catalog[key] = [translation];
        }
    }
})();
